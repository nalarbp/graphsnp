function (x, x.names, x.dates, best = c("min", "max"), prox.mat = NULL, 
    mu = NULL, haplo.length = NULL, ...) {
    best <- match.arg(best)
    if (best == "min") {
        best <- min
        which.best <- which.min
    }
    else {
        best <- max
        which.best <- which.max
    }
    if (length(x.names) != length(x.dates)) {
        stop("inconsistent length for x.dates")
    }
    if (is.character(x.dates)) {
        msg <- paste("x.dates is a character vector; ", "please convert it as dates using 'as.POSIXct'", 
            "\n(making sure dates are given as 'YYYY/MM/DD' or 'YYYY-MM-DD').", 
            sep = "")
        stop(msg)
    }
    x <- as.matrix(x)
    if (!is.null(prox.mat) && !identical(dim(prox.mat), dim(x))) {
        stop("prox.mat is provided but its dimensions are inconsistent with that of x")
    }
    N <- length(x.names)
    id <- 1:N
    x.dates <- as.POSIXct(round.POSIXt(x.dates, units = "days"))
    temp <- as.vector(unique(x))
    D.ARE.MUT <- all(temp - round(temp, 10) < 1e-14)
    colnames(x) <- rownames(x) <- id
    if (!is.null(prox.mat)) {
        colnames(prox.mat) <- rownames(prox.mat) <- id
    }
    if (length(x.names) != nrow(x)) {
        stop("inconsistent dimension for x")
    }
    test.equal <- function(val, vec) {
        return(abs(val - vec) < 1e-12)
    }
    which.is.best <- function(vec) {
        res <- names(vec)[test.equal(best(vec), vec)]
        return(res)
    }
    selAmongAncestors <- function(idx, ances) {
        if (!is.null(prox.mat)) {
            toKeep <- test.equal(max(prox.mat[ances, idx]), prox.mat[ances, 
                idx])
            ances <- ances[toKeep]
        }
        if (length(ances) > 1) {
            if (!D.ARE.MUT | is.null(mu) | is.null(haplo.length)) {
                ances <- ances[which.min(x.dates[ances])]
            }
            else {
                timeDiff <- as.numeric(difftime(x.dates[idx], 
                  x.dates[ances], units = "day"))
                nbMut <- x[ances, idx]
                prob <- dbinom(nbMut, timeDiff * haplo.length, 
                  mu)
                ances <- ances[which.max(prob)]
            }
        }
        return(ances)
    }
    
    findAncestor <- function(idx) {
        candid <- which(x.dates < x.dates[idx])
        if (length(candid) == 0) 
            return(list(ances = NA, weight = NA))
        if (length(candid) == 1) 
            return(list(ances = candid, weight = x[candid, idx]))
        ancesId <- as.numeric(which.is.best(x[candid, idx]))
        if (length(ancesId) > 1) {
            ancesId <- selAmongAncestors(idx, ancesId)
        }
        return(list(ances = ancesId, weight = x[ancesId, idx]))
    }

    res <- sapply(id, findAncestor)
    res <- data.frame(ances = unlist(res[1, ]), weight = unlist(res[2, 
        ]))
    ances.date <- x.dates[res[, 1]]
    res <- cbind.data.frame(id, res, date = x.dates, ances.date)
    rownames(res) <- x.names
    class(res) <- c("seqTrack", "data.frame")
    return(res)