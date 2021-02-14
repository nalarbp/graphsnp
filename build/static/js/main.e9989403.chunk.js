(this["webpackJsonpgraph-snp"] = this["webpackJsonpgraph-snp"] || []).push([
  [0],
  {
    206: function (e, t, n) {},
    399: function (e, t, n) {},
    445: function (e, t, n) {},
    446: function (e, t, n) {},
    536: function (e, t) {},
    538: function (e, t) {},
    932: function (e, t, n) {},
    949: function (e, t, n) {},
    951: function (e, t, n) {},
    954: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(1),
        r = n(0),
        s = n.n(r),
        c = n(26),
        i = n.n(c),
        o = (n(445), n(400)),
        u = n(401),
        l = n(402),
        d = n(430),
        p = (n(446), n(36)),
        h = n(982),
        g = n(984),
        j = n(977),
        b = n(966),
        f = (n(206), n(32)),
        x = n(24),
        O = "INPUT_LOADING",
        m = "GRAPH_OBJECT",
        y = "GRAPH_CLUSTER",
        v = "MATRIX_HAMMING",
        S = "NAV_LOCATION",
        T = "SEQ_DATA",
        E = "META_DATA",
        w = "METADATA_CATEGORICAL",
        D = "TIME_TREE_DATA",
        C = "COLOR_LUT",
        _ = "SETTING_METHOD",
        L = "SETTING_LAYOUT",
        U = "SETTING_IS_USER_REDRAW",
        I = "SETTING_EDGE_FILTER_CUTOFF",
        k = "SETTING_IS_USER_FILTER_EDGES",
        M = "SETTING_CLUSTER_METHOD",
        F = "SETTING_IS_USER_CLUSTERING",
        A = "SETTING_IS_EDGE_SCALED",
        N = "SETTING_EDGE_SCALE_FACTOR",
        q = "SETTING_COLOR_NODE_BY",
        R = "SETTING_EXPORT_FORMAT",
        G = "SETTING_IS_USER_DOWNLOADING",
        P = "DIST_DATA_TO_DISPLAY",
        z = "DIST_DATA_COLUMN",
        B = "DIST_CHART_ORIENTATION",
        H = "DIST_EXPORT_FORMAT",
        X = "DIST_IS_USER_DRAW",
        J = "DIST_IS_USER_EXPORT";
      function V(e) {
        return { type: S, payload: e };
      }
      var Y = n(988),
        W = n(42),
        Q = n.n(W),
        $ = n(126),
        K = n(972),
        Z = n(433),
        ee = n(98),
        te = n(985),
        ne = n(986);
      function ae(e) {
        return { type: T, payload: e };
      }
      function re(e) {
        return { type: E, payload: e };
      }
      function se(e) {
        return { type: O, payload: e };
      }
      var ce = n(451);
      function ie(e) {
        (this.seq = e),
          (this.seqIDs = e.map(function (e) {
            return e.id;
          }));
      }
      ie.prototype.getHammingMatrix = function () {
        for (
          var e = this.seq, t = this.seqIDs, n = new Map(), a = 0;
          a < t.length - 1;
          a++
        )
          for (var r = e[a], s = a + 1; s < e.length; s++) {
            var c = e[s],
              i = ce(r.sequence, c.sequence);
            if (n.get(r.id)) {
              var o = n.get(r.id);
              o.push({ source: r.id, target: c.id, value: i }), n.set(r.id, o);
            } else {
              var u = [{ source: r.id, target: c.id, value: i }];
              n.set(r.id, u);
            }
            if (n.get(c.id)) {
              var l = n.get(c.id);
              l.push({ source: c.id, target: r.id, value: i }), n.set(c.id, l);
            } else {
              var d = [{ source: c.id, target: r.id, value: i }];
              n.set(c.id, d);
            }
          }
        return n;
      };
      var oe = ie;
      function ue(e) {
        return { type: v, payload: e };
      }
      function le(e) {
        return { type: m, payload: e };
      }
      function de(e) {
        return { type: y, payload: e };
      }
      var pe = n(271).fastaToJson,
        he = K.a.Dragger;
      var ge = Object(f.b)(
        function (e) {
          return { sequence: e.sequence, patientMovement: e.patientMovement };
        },
        function (e) {
          return Object(x.b)(
            {
              sequenceToStore: ae,
              isinputLoadingToStore: se,
              hmmMatrixToStore: ue,
            },
            e
          );
        }
      )(function (e) {
        function t() {
          return (t = Object($.a)(
            Q.a.mark(function t(n) {
              var a, r, s, c, i, o, u, l, d;
              return Q.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (null !== e.sequence) {
                        t.next = 44;
                        break;
                      }
                      return (t.next = 3), pe(n);
                    case 3:
                      if (
                        ((a = t.sent),
                        (r = []),
                        !(Array.isArray(a) && a.length > 1))
                      ) {
                        t.next = 41;
                        break;
                      }
                      (s = {}), (c = []), (i = !0), (o = 0);
                    case 10:
                      if (!(o < a.length)) {
                        t.next = 38;
                        break;
                      }
                      if (
                        ((u = a[o].messages),
                        (l = a[o].parsedSequence),
                        (d = a[o].success),
                        -1 === c.indexOf(l.size) && c.push(l.size),
                        d)
                      ) {
                        t.next = 19;
                        break;
                      }
                      return (
                        (i = !1),
                        alert("Parsing error:", l.name),
                        t.abrupt("break", 38)
                      );
                    case 19:
                      if (!(u.length > 0)) {
                        t.next = 23;
                        break;
                      }
                      return (i = !1), alert(u[0]), t.abrupt("break", 38);
                    case 23:
                      if (!(c.length > 1)) {
                        t.next = 27;
                        break;
                      }
                      return (
                        (i = !1),
                        alert(
                          "Size error: Alignment required sequence with same length"
                        ),
                        t.abrupt("break", 38)
                      );
                    case 27:
                      if (s[l.name]) {
                        t.next = 31;
                        break;
                      }
                      (s[l.name] = !0), (t.next = 34);
                      break;
                    case 31:
                      return (
                        (i = !1),
                        alert("Sequence error: Duplicated sequence"),
                        t.abrupt("break", 38)
                      );
                    case 34:
                      i &&
                        r.push({
                          id: l.name,
                          size: l.size,
                          sequence: l.sequence.toLowerCase(),
                        });
                    case 35:
                      o++, (t.next = 10);
                      break;
                    case 38:
                      i &&
                        (Z.b.success(
                          "The sequences have been loaded, now building distance matrix ..",
                          2
                        ),
                        setTimeout(function () {
                          var t = new oe(r).getHammingMatrix();
                          Z.b.success(
                            "Pair-wise SNP distance matrix has been created",
                            1
                          ),
                            e.sequenceToStore(r),
                            e.hmmMatrixToStore(t),
                            e.isinputLoadingToStore(!1);
                        }, 100)),
                        (t.next = 42);
                      break;
                    case 41:
                      alert("Error: Required at least 2 sequences");
                    case 42:
                      t.next = 45;
                      break;
                    case 44:
                      alert(
                        "Sequences have been loaded. Refresh to re-load a new one"
                      );
                    case 45:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        return Object(a.jsx)(s.a.Fragment, {
          children: Object(a.jsx)(he, {
            accept: ".fa, .fasta, .fna, .mfa",
            showUploadList: !1,
            style: { backgroundColor: "transparent", height: "500px" },
            name: "file",
            multiple: !1,
            action: "dummy-post",
            beforeUpload: function (n) {
              if (n) {
                var a = new FileReader();
                a.readAsText(n),
                  e.isinputLoadingToStore(!0),
                  (a.onloadend = function (e) {
                    !(function (e) {
                      t.apply(this, arguments);
                    })(e.target.result);
                  });
              }
              return !1;
            },
            children: Object(a.jsx)("div", {
              id: "input-loader-snps",
              children: Object(a.jsxs)(ee.a, {
                id: "input-loader-button-snps",
                shape: "round",
                size: "large",
                children: [
                  e.sequence
                    ? Object(a.jsx)(te.a, { style: { fontSize: "14pt" } })
                    : Object(a.jsx)(ne.a, {}),
                  " SNPs",
                ],
              }),
            }),
          }),
        });
      });
      function je(e) {
        return { type: C, payload: e };
      }
      function be(e) {
        return { type: w, payload: e };
      }
      var fe = n(979),
        xe = n(974),
        Oe = n(978),
        me = n(965),
        ye = n(987);
      function ve(e, t, n) {
        return n.indexOf(e) === t;
      }
      function Se(e, t) {
        var n = null;
        if (Array.isArray(e) && e.length > 0) {
          var a = (function (e, t) {
              for (
                var n = Object(Oe.a)().domain([0, e.length]).interpolator(t),
                  a = [],
                  r = 0;
                r < e.length;
                r++
              )
                a.push(n(r));
              return Object(me.a)().domain(e).range(a);
            })(
              e
                .map(function (e) {
                  return e[t];
                })
                .filter(ve),
              ye.a
            ),
            r = new Map();
          e.forEach(function (e) {
            r.set(e.sample, a(e[t]));
          }),
            (n = r);
        }
        return n;
      }
      function Te(e, t, n, a) {
        if (e) {
          var r = t + 1,
            s = r ? r * n : 3;
          return "edge" === a || s < 1 ? s : 1;
        }
        return "edge" === a ? 3 : 1;
      }
      function Ee(e) {
        return (
          (e *
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            )) /
          100
        );
      }
      var we = n(20),
        De = Object(xe.a)("%Y-%m-%d");
      function Ce() {
        return (Ce = Object($.a)(
          Q.a.mark(function e(t, n, a, r, s) {
            var c, i, o, u, l, d, p, h, g, j, b, f;
            return Q.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      Object(fe.a)(t).then(function (e) {
                        return e;
                      })
                    );
                  case 2:
                    if (
                      ((c = e.sent),
                      (i = ["sample_id", "sample_date"]),
                      (o = Object.keys(c[0])),
                      (u = !0),
                      i.forEach(function (e) {
                        -1 === o.indexOf(e) && (u = !1);
                      }),
                      u)
                    ) {
                      e.next = 11;
                      break;
                    }
                    return (
                      alert(
                        "Invalid headers: One or more required headers was not found"
                      ),
                      s(!1),
                      e.abrupt("return")
                    );
                  case 11:
                    if (
                      ((l = we.countBy(c, "sample_id")),
                      !(
                        (d = Object.keys(l)
                          .map(function (e) {
                            return { name: e, count: l[e] };
                          })
                          .filter(function (e) {
                            return e.count > 1;
                          })).length > 0
                      ))
                    ) {
                      e.next = 17;
                      break;
                    }
                    return (
                      alert(
                        "Invalid data: duplicate record in column sample id" +
                          "".concat(JSON.stringify(d))
                      ),
                      s(!1),
                      e.abrupt("return")
                    );
                  case 17:
                    if (!!!l[""]) {
                      e.next = 22;
                      break;
                    }
                    return (
                      alert(
                        "Invalid data: column sample_id contain empty record"
                      ),
                      s(!1),
                      e.abrupt("return")
                    );
                  case 22:
                    if (
                      ((p = !1),
                      c.forEach(function (e) {
                        (e.sample_id = e.sample_id.replace(/\s*$/, "")),
                          (e.sample_date = e.sample_date.replace(/\s*$/, "")),
                          De(e.sample_date)
                            ? ((e.uid = e.sample_id),
                              (e.sample_date = De(e.sample_date)))
                            : (p = !0);
                      }),
                      !p)
                    ) {
                      e.next = 28;
                      break;
                    }
                    return (
                      alert(
                        "Invalid data: wrong date format in column sample date"
                      ),
                      s(!1),
                      e.abrupt("return")
                    );
                  case 28:
                    (h = o.filter(function (e) {
                      return "sample_id" !== e;
                    })),
                      (g = {}),
                      (j = new Map()),
                      (b = [
                        "0",
                        0,
                        "null",
                        "na",
                        "#N/A",
                        "NA",
                        "",
                        "excluded",
                      ]),
                      h.forEach(function (e) {
                        var t = e,
                          n = [],
                          a = [];
                        c.forEach(function (e) {
                          var r = {};
                          (r.sample = e.sample_id),
                            (r[t] = e[t]),
                            a.push(r),
                            n.push(e[t]);
                        }),
                          n.filter(ve),
                          n.forEach(function (e) {
                            var n = a
                              .filter(function (n) {
                                return n[t] === e;
                              })
                              .map(function (e) {
                                return e.sample;
                              });
                            if (-1 === b.indexOf(e)) {
                              var r = t.concat("-", e);
                              j.set(r, n);
                            }
                          });
                        var r = Se(a, t);
                        g[t] = r;
                      }),
                      (f = new Map()),
                      c.forEach(function (e) {
                        f.set(e.sample_id, e);
                      }),
                      n(f),
                      a(g),
                      r(j),
                      s(!1);
                  case 39:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      var _e = K.a.Dragger;
      var Le = Object(f.b)(
          function (e) {
            return { metadata: e.metadata };
          },
          function (e) {
            return Object(x.b)(
              {
                metadataToStore: re,
                colorLUTtoStore: je,
                isinputLoadingToStore: se,
                categoricalMapToStore: be,
              },
              e
            );
          }
        )(function (e) {
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsx)(_e, {
              accept: ".csv",
              showUploadList: !1,
              style: { height: "500px", backgroundColor: "transparent" },
              name: "file",
              multiple: !1,
              action: "dummy-post",
              beforeUpload: function (t) {
                if (t) {
                  var n = new FileReader();
                  n.readAsDataURL(t),
                    e.isinputLoadingToStore(!0),
                    (n.onloadend = function (t) {
                      !(function (e, t, n, a, r) {
                        Ce.apply(this, arguments);
                      })(
                        t.target.result,
                        e.metadataToStore,
                        e.colorLUTtoStore,
                        e.categoricalMapToStore,
                        e.isinputLoadingToStore
                      );
                    });
                }
                return !1;
              },
              children: Object(a.jsx)("div", {
                id: "input-loader-metadata",
                children: Object(a.jsxs)(ee.a, {
                  id: "input-loader-button-metadata",
                  shape: "round",
                  size: "large",
                  children: [
                    e.metadata
                      ? Object(a.jsx)(te.a, { style: { fontSize: "14pt" } })
                      : Object(a.jsx)(ne.a, {}),
                    " Metadata",
                  ],
                }),
              }),
            }),
          });
        }),
        Ue = n(271).fastaToJson,
        Ie = K.a.Dragger;
      var ke = Object(f.b)(
          function (e) {
            return { metadata: e.metadata };
          },
          function (e) {
            return Object(x.b)(
              { metadataToStore: re, isinputLoadingToStore: se },
              e
            );
          }
        )(function (e) {
          function t() {
            return (t = Object($.a)(
              Q.a.mark(function t(n) {
                var a, r, s, c, i, o, u, l, d;
                return Q.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (null !== e.sequence) {
                          t.next = 44;
                          break;
                        }
                        return (t.next = 3), Ue(n);
                      case 3:
                        if (
                          ((a = t.sent),
                          (r = []),
                          !(Array.isArray(a) && a.length > 1))
                        ) {
                          t.next = 41;
                          break;
                        }
                        (s = {}), (c = []), (i = !0), (o = 0);
                      case 10:
                        if (!(o < a.length)) {
                          t.next = 38;
                          break;
                        }
                        if (
                          ((u = a[o].messages),
                          (l = a[o].parsedSequence),
                          (d = a[o].success),
                          -1 === c.indexOf(l.size) && c.push(l.size),
                          d)
                        ) {
                          t.next = 19;
                          break;
                        }
                        return (
                          (i = !1),
                          alert("Parsing error:", l.name),
                          t.abrupt("break", 38)
                        );
                      case 19:
                        if (!(u.length > 0)) {
                          t.next = 23;
                          break;
                        }
                        return (i = !1), alert(u[0]), t.abrupt("break", 38);
                      case 23:
                        if (!(c.length > 1)) {
                          t.next = 27;
                          break;
                        }
                        return (
                          (i = !1),
                          alert(
                            "Size error: Alignment required sequence with same length"
                          ),
                          t.abrupt("break", 38)
                        );
                      case 27:
                        if (s[l.name]) {
                          t.next = 31;
                          break;
                        }
                        (s[l.name] = !0), (t.next = 34);
                        break;
                      case 31:
                        return (
                          (i = !1),
                          alert("Sequence error: Duplicated sequence"),
                          t.abrupt("break", 38)
                        );
                      case 34:
                        i &&
                          r.push({
                            id: l.name,
                            size: l.size,
                            sequence: l.sequence.toLowerCase(),
                          });
                      case 35:
                        o++, (t.next = 10);
                        break;
                      case 38:
                        i &&
                          (e.sequenceToStore(r),
                          Z.b.success("The sequences have been loaded", 2)),
                          (t.next = 42);
                        break;
                      case 41:
                        alert("Error: Required at least 2 sequences");
                      case 42:
                        t.next = 45;
                        break;
                      case 44:
                        alert(
                          "Sequences have been loaded. Refresh to re-load a new one"
                        );
                      case 45:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )).apply(this, arguments);
          }
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsx)(Ie, {
              accept: ".csv",
              showUploadList: !1,
              style: { height: "500px", backgroundColor: "transparent" },
              name: "file",
              multiple: !1,
              action: "dummy-post",
              beforeUpload: function (n) {
                if (n) {
                  var a = new FileReader();
                  a.readAsText(n),
                    e.isinputLoadingToStore(!0),
                    (a.onloadend = function (n) {
                      !(function (e) {
                        t.apply(this, arguments);
                      })(n.target.result),
                        e.isinputLoadingToStore(!1);
                    });
                }
                return !1;
              },
              children: Object(a.jsx)("div", {
                id: "input-loader-patientMovement",
                children: Object(a.jsxs)(ee.a, {
                  id: "input-loader-button-patientMovement",
                  shape: "round",
                  size: "large",
                  children: [
                    e.sequence
                      ? Object(a.jsx)(te.a, { twoToneColor: "#52c41a" })
                      : Object(a.jsx)(ne.a, {}),
                    " Time Tree",
                  ],
                }),
              }),
            }),
          });
        }),
        Me = function (e) {
          return Object(a.jsx)(h.a, {
            children: Object(a.jsx)(g.a, {
              sm: 24,
              id: "footer-component",
              children: Object(a.jsxs)("p", {
                children: [
                  Object(a.jsx)("a", {
                    href: "https://graphsnp.beatsonlab.com",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "GraphSNP v.0.1",
                  }),
                  Object(a.jsx)("br", {}),
                  Object(a.jsxs)("b", {
                    children: [
                      " ",
                      "Graph-based outbreak cluster and transmission",
                      Object(a.jsx)("br", {}),
                      " detection and visualization using single-nucleotide polymorphisms (SNPs) in web browser",
                    ],
                  }),
                  Object(a.jsx)("br", {}),
                  " Developed by Budi Permana at",
                  " ",
                  Object(a.jsxs)("a", {
                    href: "https://beatsonlab.com/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [" ", "Beatson Lab"],
                  }),
                  Object(a.jsx)("br", {}),
                  " ",
                  Object(a.jsx)("a", {
                    href: "https://www.uq.edu.au/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "The University of Queensland",
                  }),
                  " ",
                  "| Australia",
                  Object(a.jsx)("br", {}),
                  " ",
                  new Date().getFullYear(),
                ],
              }),
            }),
          });
        },
        Fe = n(417),
        Ae = n.n(Fe),
        Ne = Object(a.jsx)(Y.a, { style: { fontSize: 34 }, spin: !0 }),
        qe = String(Ee(100) - 380) + "px",
        Re = {
          fpsLimit: 24,
          particles: {
            number: { value: 25 },
            size: { value: 4 },
            links: { enable: !0, distance: 75 },
            move: { enable: !0, speed: 2, outModes: { default: "bounce" } },
          },
          interactivity: {
            events: { onhover: { enable: !1, mode: "repulse" } },
          },
        };
      var Ge = Object(f.b)(
          function (e) {
            return { isInputLoading: e.isInputLoading };
          },
          function (e) {
            return Object(x.b)({ changeNavLocation: V }, e);
          }
        )(function (e) {
          return Object(a.jsxs)(s.a.Fragment, {
            children: [
              Object(a.jsx)(h.a, {
                children: Object(a.jsx)(g.a, {
                  xs: 24,
                  id: "header-content",
                  children: Object(a.jsx)(j.a, {
                    visible: e.isInputLoading,
                    closable: !1,
                    centered: !0,
                    width: 0,
                    footer: null,
                    bodyStyle: { textAlign: "center", padding: "0px" },
                    children: Object(a.jsx)(b.a, {
                      indicator: Ne,
                      style: { color: "white" },
                      tip: "Processing...",
                      size: "large",
                    }),
                  }),
                }),
              }),
              Object(a.jsxs)(h.a, {
                id: "input-wrapper",
                children: [
                  Object(a.jsx)(Ae.a, {
                    params: Re,
                    height: qe,
                    style: { position: "absolute", height: "200px" },
                  }),
                  Object(a.jsx)(g.a, {
                    xs: 24,
                    sm: 8,
                    children: Object(a.jsx)(ge, {}),
                  }),
                  Object(a.jsx)(g.a, {
                    xs: 24,
                    sm: 8,
                    children: Object(a.jsx)(Le, {}),
                  }),
                  Object(a.jsx)(g.a, {
                    xs: 24,
                    sm: 8,
                    children: Object(a.jsx)(ke, {}),
                  }),
                ],
              }),
              Object(a.jsx)(Me, {}),
            ],
          });
        }),
        Pe = n(968),
        ze = (n(932), n(975)),
        Be = n(983),
        He = n(967),
        Xe = n(980);
      function Je(e) {
        return { type: _, payload: e };
      }
      function Ve(e) {
        return { type: L, payload: e };
      }
      function Ye(e) {
        return { type: U, payload: e };
      }
      function We(e) {
        return { type: I, payload: e };
      }
      function Qe(e) {
        return { type: M, payload: e };
      }
      function $e(e) {
        return { type: F, payload: e };
      }
      function Ke(e) {
        return { type: A, payload: e };
      }
      function Ze(e) {
        return { type: N, payload: e };
      }
      function et(e) {
        return { type: q, payload: e };
      }
      function tt(e) {
        return { type: R, payload: e };
      }
      function nt(e) {
        return { type: G, payload: e };
      }
      var at = ze.a.Option;
      var rt = Object(f.b)(
          function (e) {
            return {
              metadata: e.metadata,
              patientMovement: e.patientMovement,
              sequence: e.sequence,
              graphSettings: e.graphSettings,
              graphObject: e.graphObject,
              graphClusters: e.graphClusters,
              colorLUT: e.colorLUT,
            };
          },
          function (e) {
            return Object(x.b)(
              {
                changeMethodSetting: Je,
                changeLayoutSetting: Ve,
                changeIsUserReDrawSetting: Ye,
                changeEdgeFilterCutoffSetting: We,
                changeClusterMethodSetting: Qe,
                changeIsUserClusteringSetting: $e,
                changeIsEdgeScaledSetting: Ke,
                changeEdgeScaleFactorSetting: Ze,
                changeColorNodeSetting: et,
                changeExportFormatSetting: tt,
                changeIsUserDownloadingSetting: nt,
              },
              e
            );
          }
        )(function (e) {
          var t = e.graphSettings.method,
            n = e.graphSettings.layout,
            r = e.graphSettings.isUserReDraw,
            c = e.graphSettings.edgeFilterCutoff,
            i = e.graphSettings.clusterMethod,
            o = e.graphSettings.isUserClustering,
            u = e.graphSettings.isEdgeScaled,
            l = e.graphSettings.edgeScaleFactor,
            d = e.graphSettings.colorNodedBy,
            p = e.graphSettings.exportFormat,
            j = e.graphSettings.isUserDownloading,
            b = function () {
              r || e.changeIsUserReDrawSetting(!0);
            },
            f = function (e, t) {
              return Object(a.jsx)(
                at,
                { disabled: !1, value: e, children: e },
                t
              );
            };
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsxs)(h.a, {
              gutter: [8, 8],
              children: [
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("h5", { children: "Graph settings" }),
                    Object(a.jsx)("p", { children: "Construction method" }),
                    Object(a.jsxs)(ze.a, {
                      disabled: !e.sequence,
                      value: t,
                      style: { width: "100%" },
                      onChange: function (t) {
                        e.changeMethodSetting(t);
                      },
                      children: [
                        Object(a.jsx)(at, { value: "mcg", children: "MCG" }),
                        Object(a.jsx)(at, {
                          disabled: !e.sequence || !e.metadata,
                          value: "cge",
                          children: "MCG + metadata",
                        }),
                        Object(a.jsx)(at, {
                          value: "cathai",
                          children: "CATHAI",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "Graph layout" }),
                    Object(a.jsxs)(ze.a, {
                      disabled: !e.sequence,
                      value: n,
                      style: { width: "100%" },
                      onChange: function (t) {
                        e.changeLayoutSetting(t);
                      },
                      children: [
                        Object(a.jsx)(at, { value: "cose", children: "COSE" }),
                        Object(a.jsx)(at, {
                          value: "circle",
                          children: "Circle",
                        }),
                        Object(a.jsx)(at, { value: "grid", children: "Grid" }),
                        Object(a.jsx)(at, {
                          value: "random",
                          children: "Random",
                        }),
                        Object(a.jsx)(at, {
                          value: "concentric",
                          children: "Concentric",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "SNPs cutoff" }),
                    Object(a.jsx)(Be.a, {
                      min: 0,
                      disabled: !e.sequence,
                      step: 0.1,
                      value: c,
                      onChange: function (t) {
                        t > 0 && e.changeEdgeFilterCutoffSetting(t);
                      },
                      style: { marginBottom: "5px" },
                    }),
                  ],
                }),
                Object(a.jsx)(g.a, {
                  span: 24,
                  children: Object(a.jsx)(ee.a, {
                    danger: !0,
                    disabled: !e.sequence,
                    onClick: b,
                    children: "Draw graph",
                  }),
                }),
                Object(a.jsx)(He.a, { style: { margin: "10px 0px 0px 0px" } }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("h5", { children: "Cluster Settings" }),
                    Object(a.jsx)("p", { children: "Clustering method " }),
                    Object(a.jsxs)(ze.a, {
                      disabled: !e.graphObject,
                      value: i,
                      style: { width: "100%" },
                      onChange: function (t) {
                        e.changeClusterMethodSetting(t);
                      },
                      children: [
                        Object(a.jsx)(at, {
                          value: "Connected Components",
                          children: "Connected Components",
                        }),
                        Object(a.jsx)(at, {
                          value: "Louvain",
                          children: "Louvain",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsx)(g.a, {
                  span: 24,
                  children: Object(a.jsx)(ee.a, {
                    disabled: !e.graphObject,
                    onClick: function () {
                      o || e.changeIsUserClusteringSetting(!0);
                    },
                    children: "Find clusters",
                  }),
                }),
                Object(a.jsx)(He.a, { style: { margin: "10px 0px 0px 0px" } }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("h5", { children: "Visualization settings" }),
                    Object(a.jsx)(Xe.a, {
                      style: { fontSize: "10px" },
                      onChange: function (t) {
                        var n = t.target.checked;
                        e.changeIsEdgeScaledSetting(n);
                      },
                      checked: u,
                      children: "Scale edge to weight",
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "Scale factor" }),
                    Object(a.jsx)(Be.a, {
                      min: 1e-5,
                      disabled: !e.graphObject,
                      step: 0.1,
                      value: l,
                      onChange: function (t) {
                        t > 0 && e.changeEdgeScaleFactorSetting(t);
                      },
                      style: { marginBottom: "5px" },
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "Color nodes by" }),
                    Object(a.jsxs)(ze.a, {
                      disabled: !e.graphObject,
                      value: d,
                      style: { width: "100%" },
                      onChange: function (t) {
                        e.changeColorNodeSetting(t);
                      },
                      children: [
                        " ",
                        e.colorLUT && Object.keys(e.colorLUT)
                          ? Object.keys(e.colorLUT).map(function (e, t) {
                              return f(e, t);
                            })
                          : ["na"].map(function (e, t) {
                              return f(e, t);
                            }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "Export format" }),
                    Object(a.jsxs)(ze.a, {
                      value: p,
                      style: { width: "100%" },
                      onChange: function (t) {
                        j || e.changeExportFormatSetting(t);
                      },
                      children: [
                        Object(a.jsx)(at, { value: "dot", children: "DOT" }),
                        Object(a.jsx)(at, {
                          value: "edgeList",
                          children: "Edge List",
                        }),
                        Object(a.jsx)(at, {
                          value: "grapml",
                          children: "Graph ML",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsx)(g.a, {
                  span: 24,
                  children: Object(a.jsx)(ee.a, {
                    onClick: b,
                    children: "Export graph",
                  }),
                }),
              ],
            }),
          });
        }),
        st = n(269),
        ct = n(102),
        it = n(137);
      function ot(e, t) {
        (this.nodes = e), (this.edges = t);
      }
      (ot.prototype.getSymetricEdges = function () {
        var e = this.edges,
          t = new Map();
        return (
          (e = e.filter(function (n) {
            var a = n.source.concat("-", n.target),
              r = n.target.concat("-", n.source);
            return e.find(function (e) {
              return e.source === n.target && e.target === n.source;
            })
              ? !t.get(r) && !t.get(a) && (t.set(a, !0), t.set(r, !0), !0)
              : (t.set(a, !0), t.set(r, !0), !0);
          })),
          new ot(this.nodes, e)
        );
      }),
        (ot.prototype.getEdgesLowerThanCutoff = function (e) {
          var t = this.edges;
          return (
            e &&
              e > 0 &&
              (t = t.filter(function (t) {
                return t.value < e;
              })),
            new ot(this.nodes, t)
          );
        }),
        (ot.prototype.getEdgesGreaterThanCutoff = function (e) {
          var t = this.edges;
          return (
            e &&
              e > 0 &&
              (t = t.filter(function (t) {
                return t.value > e;
              })),
            new ot(this.nodes, t)
          );
        });
      var ut = ot;
      function lt(e, t, n, a, r) {
        var s = { creator: null, nodes: null, edges: null };
        switch (t) {
          case "mcg":
            var c = (function (e, t) {
              var n = [],
                a = [];
              e.forEach(function (e, r) {
                a.push(r);
                for (
                  var s = e.sort(function (e, t) {
                      return e.value - t.value;
                    }),
                    c = s[0].value,
                    i = 0,
                    o = 0;
                  o < s.length;
                  o++
                ) {
                  if (s[o].value !== c) {
                    i = o;
                    break;
                  }
                  i = o;
                }
                s.splice(i),
                  t &&
                    t > 0 &&
                    (s = s.filter(function (e) {
                      return e.value < t;
                    })),
                  (n = n.concat(s));
              });
              var r = new Map();
              return (
                (n = n.filter(function (e) {
                  var t = e.source.concat("-", e.target),
                    a = e.target.concat("-", e.source);
                  return n.find(function (t) {
                    return t.source === e.target && t.target === e.source;
                  })
                    ? !r.get(a) && !r.get(t) && (r.set(t, !0), r.set(a, !0), !0)
                    : (r.set(t, !0), r.set(a, !0), !0);
                })),
                { nodes: a, edges: n }
              );
            })(e, n);
            (s.creator = "mcg"), (s.nodes = c.nodes), (s.edges = c.edges);
            break;
          case "cathai":
            var i = (function (e, t) {
              var n = [],
                a = [];
              e.forEach(function (e, r) {
                a.push(r);
                var s = e.sort(function (e, t) {
                  return e.value - t.value;
                });
                t &&
                  t > 0 &&
                  (s = s.filter(function (e) {
                    return e.value < t;
                  })),
                  (n = n.concat(s));
              });
              var r = new Map();
              return (
                (n = n.filter(function (e) {
                  var t = e.source.concat("-", e.target),
                    a = e.target.concat("-", e.source);
                  return n.find(function (t) {
                    return t.source === e.target && t.target === e.source;
                  })
                    ? !r.get(a) && !r.get(t) && (r.set(t, !0), r.set(a, !0), !0)
                    : (r.set(t, !0), r.set(a, !0), !0);
                })),
                { nodes: a, edges: n }
              );
            })(e, n);
            (s.creator = "cathai"), (s.nodes = i.nodes), (s.edges = i.edges);
            break;
          case "cge":
            var o = (function (e, t, n) {
              var a = [],
                r = [];
              e.forEach(function (e, t) {
                r.push(t);
                for (
                  var n = e.sort(function (e, t) {
                      return e.value - t.value;
                    }),
                    s = n[0].value,
                    c = 0,
                    i = 0;
                  i < n.length;
                  i++
                ) {
                  if (n[i].value !== s) {
                    c = i;
                    break;
                  }
                  c = i;
                }
                n.splice(c), (a = a.concat(n));
              }),
                console.log(r, a);
              var s = new ut(r, a).getSymetricEdges(),
                c = s.edges;
              return (
                c.forEach(function (e) {
                  (e.value = 1),
                    e.value < n && (e.value = e.value + 1),
                    t.forEach(function (t, n) {
                      -1 !== t.indexOf(e.source) &&
                        -1 !== t.indexOf(e.target) &&
                        (e.value = e.value + 1);
                    });
                }),
                { nodes: s.nodes, edges: c }
              );
            })(e, a, n);
            (s.creator = "cge"), (s.nodes = o.nodes), (s.edges = o.edges);
        }
        return s;
      }
      function dt(e, t, n) {
        var a,
          r,
          s,
          c,
          i = [],
          o = [];
        for (i.push(e), n[e] = !0; i.length > 0; )
          for (
            e = i.shift(), o.push(e), a = 0, r = (s = t[e]).length;
            a < r;
            a += 1
          )
            n[(c = s[a])] || (i.push(c), (n[c] = !0));
        return o;
      }
      var pt = n(939);
      function ht(e, t) {
        var n = null;
        switch (t) {
          case "Connected Components":
            n = (function (e) {
              var t,
                n = (function (e) {
                  var t,
                    n,
                    a,
                    r,
                    s,
                    c = {};
                  for (t = 0, n = e.length; t < n; t += 1)
                    (r = (a = e[t]).source),
                      (s = a.target),
                      c[r] ? c[r].push(s) : (c[r] = [s]),
                      c[s] ? c[s].push(r) : (c[s] = [r]);
                  return c;
                })(e.edges),
                a = [],
                r = {};
              for (t in n) n.hasOwnProperty(t) && !r[t] && a.push(dt(t, n, r));
              var s = [];
              return (
                (a = a.sort(function (e, t) {
                  return e.length - t.length;
                })).forEach(function (e, t) {
                  Array.isArray(e) &&
                    e.length > 0 &&
                    e.forEach(function (e) {
                      s.push({ sample: e, clusterID: t + 1 });
                    });
                }),
                { group: a, members: s }
              );
            })(e);
            break;
          case "Louvain":
            n = (function (e) {
              var t = e.edges,
                n = [];
              t.forEach(function (e) {
                n.push(e.source, e.target);
              }),
                (n = n.filter(ve));
              var a = new Map(),
                r = [],
                s = pt.jLouvain().nodes(n).edges(t)();
              for (var c in s) {
                var i = s[c];
                if ((r.push({ sample: c, clusterID: i }), a.get(i))) {
                  var o = a.get(i);
                  o.push(c), a.set(i, o);
                } else a.set(i, [c]);
              }
              var u = [];
              return (
                a.forEach(function (e, t) {
                  u.push(e);
                }),
                { group: u, members: r }
              );
            })(e);
        }
        return n;
      }
      var gt = n(424),
        jt = n.n(gt),
        bt = n(20);
      var ft = Object(f.b)(
          function (e) {
            return {
              metadata: e.metadata,
              patientMovement: e.patientMovement,
              sequence: e.sequence,
              graphObject: e.graphObject,
              hammMatrix: e.hammMatrix,
              graphSettings: e.graphSettings,
              colorLUT: e.colorLUT,
              categoricalMap: e.categoricalMap,
            };
          },
          function (e) {
            return Object(x.b)(
              {
                changeIsUserClusteringSetting: $e,
                changeIsUserReDrawSetting: Ye,
                hmmMatrixToStore: ue,
                graphObjectToStore: le,
                graphClusterToStore: de,
                colorLUTtoStore: je,
              },
              e
            );
          }
        )(function (e) {
          var t = Object(r.useState)(!1),
            n = Object(ct.a)(t, 2),
            c = n[0],
            i = n[1],
            o = Object(r.useState)(!1),
            u = Object(ct.a)(o, 2),
            l = u[0],
            d = u[1],
            p = e.graphSettings.method,
            h = e.graphSettings.layout,
            j = e.graphSettings.isUserReDraw,
            b = e.graphSettings.edgeFilterCutoff,
            f = e.graphSettings.clusterMethod,
            x = e.graphSettings.isUserClustering,
            O = e.graphSettings.colorNodedBy,
            m = e.graphSettings.isEdgeScaled,
            y = e.graphSettings.edgeScaleFactor,
            v = { name: h, animate: !1, fit: !0 },
            S = Object(r.useRef)(null);
          return (
            Object(r.useEffect)(
              function () {
                j &&
                  (d(!0),
                  setTimeout(function () {
                    !(function () {
                      var t = e.hammMatrix
                          ? e.hammMatrix
                          : new oe(e.sequence).getHammingMatrix(),
                        n = lt(t, p, b, e.categoricalMap, e.patientMovement),
                        a = (function (e) {
                          var t = e.creator,
                            n = e.nodes,
                            a = e.edges,
                            r = [];
                          return (
                            a.forEach(function (e) {
                              r.push({
                                data: {
                                  source: e.source,
                                  target: e.target,
                                  weight: e.value,
                                  dir: e.direction ? e.direction : "none",
                                },
                              });
                            }),
                            n.forEach(function (e) {
                              var n = "nlv" === t ? e.data : [],
                                a = "nlv" === t ? "compound" : "singleton";
                              r.push({ data: { id: e, nodeType: a, data: n } });
                            }),
                            r
                          );
                        })(n);
                      if (a) {
                        var r = jt()({
                          elements: a,
                          container: document.getElementById(
                            "graph-cont-cytoscape-canvas"
                          ),
                          pannable: !0,
                          selected: !0,
                          boxSelectionEnabled: !1,
                          style: [
                            {
                              selector: "node",
                              style: {
                                label: "data(id)",
                                "border-width": 3,
                                "border-style": "solid",
                                "border-color": "black",
                                "background-color": "lightgray",
                              },
                            },
                            {
                              selector: "edge",
                              style: {
                                label: "data(weight)",
                                "font-size": "8px",
                                "text-background-color": "#F5E372",
                                color: "black",
                                width: function (e) {
                                  return Te(m, e.data("weight"), y, "edge");
                                },
                                "target-arrow-color": "black",
                                "target-arrow-shape": function (e) {
                                  return "forward" === e.data("dir")
                                    ? "triangle"
                                    : "none";
                                },
                                "curve-style": "bezier",
                                "arrow-scale": function (e) {
                                  return Te(m, e.data("weight"), y, "arrow");
                                },
                              },
                            },
                            {
                              selector: ":selected",
                              style: {
                                "border-width": "5",
                                "border-color": "red",
                                "border-style": "dashed",
                                padding: "8px",
                              },
                            },
                          ],
                        });
                        r.layout(v).run(),
                          (S.current = r),
                          e.hammMatrix && e.hmmMatrixToStore(t),
                          e.graphObjectToStore(n);
                      }
                    })(),
                      i(!0),
                      d(!1),
                      e.changeIsUserReDrawSetting(!1);
                  }, 100));
              },
              [j]
            ),
            Object(r.useEffect)(
              function () {
                x &&
                  e.graphObject &&
                  (d(!0),
                  setTimeout(function () {
                    var t = ht(e.graphObject, f);
                    d(!1),
                      Z.b.success(
                        "Found ".concat(
                          t.group.length,
                          " clusters in the graph"
                        ),
                        2
                      );
                    var n = Se(t.members, "clusterID"),
                      a = bt.cloneDeep(e.colorLUT);
                    a
                      ? (a = Object(st.a)(
                          Object(st.a)({}, a),
                          {},
                          { clusterID: n }
                        ))
                      : (a = { clusterID: n });
                    e.colorLUTtoStore(a),
                      e.graphClusterToStore(t),
                      e.changeIsUserClusteringSetting(!1);
                  }, 100));
              },
              [f, x]
            ),
            Object(r.useEffect)(
              function () {
                if (h && S.current) {
                  var e = S.current,
                    t = { name: h, animate: !1, fit: !0 };
                  e.layout(t).run(), (S.current = e);
                }
              },
              [h]
            ),
            Object(r.useEffect)(
              function () {
                if (e.graphObject && S.current) {
                  var t = S.current;
                  m
                    ? (t
                        .style()
                        .selector("edge")
                        .style({
                          width: function (e) {
                            return Te(m, e.data("weight"), y, "edge");
                          },
                          "arrow-scale": function (e) {
                            return Te(m, e.data("weight"), y, "arrow");
                          },
                        })
                        .update(),
                      (S.current = t))
                    : (t
                        .style()
                        .selector("edge")
                        .style({ width: 3, "arrow-scale": 1 })
                        .update(),
                      (S.current = t)),
                    (S.current = t);
                }
              },
              [m, y]
            ),
            Object(r.useEffect)(
              function () {
                if (O && e.colorLUT && S.current) {
                  var t = S.current;
                  t
                    .style()
                    .selector("node")
                    .style({
                      "background-color": function (t) {
                        return (function (e, t, n) {
                          var a = "lightgray";
                          if ("na" !== t) {
                            var r = n[t];
                            a = r.get(e) ? r.get(e) : "lightgray";
                          }
                          return a;
                        })(t.data("id"), O, e.colorLUT);
                      },
                    })
                    .update(),
                    (S.current = t);
                }
              },
              [O, e.colorLUT]
            ),
            Object(a.jsxs)(s.a.Fragment, {
              children: [
                Object(a.jsxs)(g.a, {
                  span: 24,
                  style: { position: "relative" },
                  children: [
                    Object(a.jsx)("div", {
                      id: "graph-cont-is-empty",
                      style: { display: c ? "none" : "block" },
                      children: Object(a.jsx)(it.a, {
                        description:
                          "No previous graph found: click draw to create one",
                        image: it.a.PRESENTED_IMAGE_SIMPLE,
                      }),
                    }),
                    Object(a.jsx)("div", {
                      id: "graph-cont-is-processing",
                      style: { display: l ? "block" : "none" },
                      children: Object(a.jsxs)("p", {
                        children: [
                          Object(a.jsx)("span", {
                            children: Object(a.jsx)(Y.a, {
                              style: { fontSize: 18 },
                              spin: !0,
                            }),
                          }),
                          " ",
                          "Processing ...",
                        ],
                      }),
                    }),
                  ],
                }),
                Object(a.jsx)("div", { id: "graph-cont-cytoscape-canvas" }),
              ],
            })
          );
        }),
        xt = Pe.a.Sider,
        Ot = Pe.a.Content,
        mt = function () {
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsxs)(Pe.a, {
              children: [
                Object(a.jsx)(xt, {
                  id: "graphsnp-sider",
                  children: Object(a.jsx)(rt, {}),
                }),
                Object(a.jsx)(Pe.a, {
                  children: Object(a.jsx)(Ot, {
                    id: "graphsnp-container",
                    children: Object(a.jsx)(ft, {}),
                  }),
                }),
              ],
            }),
          });
        };
      n(949);
      var yt = Object(f.b)(null, function (e, t) {
        return Object(x.b)({ changeNavLocation: V }, e);
      })(function (e) {
        return Object(a.jsx)(s.a.Fragment, {
          children: Object(a.jsx)(Pe.a, { id: "page-documentation" }),
        });
      });
      n(399);
      function vt(e) {
        return { type: P, payload: e };
      }
      function St(e) {
        return { type: z, payload: e };
      }
      function Tt(e) {
        return { type: B, payload: e };
      }
      function Et(e) {
        return { type: H, payload: e };
      }
      function wt(e) {
        return { type: X, payload: e };
      }
      function Dt(e) {
        return { type: J, payload: e };
      }
      var Ct = ze.a.Option;
      var _t = Object(f.b)(
          function (e) {
            return {
              snpDistSettings: e.snpDistSettings,
              hammingMatrix: e.hammMatrix,
              colorLUT: e.colorLUT,
            };
          },
          function (e) {
            return Object(x.b)(
              {
                dist_changeDataToDisplay: vt,
                dist_changeDataColumn: St,
                dist_changeChartOrientation: Tt,
                dist_changeExportFormat: Et,
                dist_changeIsUserDraw: wt,
                dist_changeIsUserExport: Dt,
              },
              e
            );
          }
        )(function (e) {
          var t = e.snpDistSettings.dataToDisplay,
            n = e.snpDistSettings.dataColumn,
            r = e.snpDistSettings.chartOrientation,
            c = e.snpDistSettings.snpDistExportFormat,
            i = e.snpDistSettings.isUserDrawChart,
            o = e.snpDistSettings.isUserExportSnpDist;
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsxs)(h.a, {
              gutter: [8, 8],
              children: [
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("h5", {
                      children: "Pair-wise SNPs distance settings",
                    }),
                    Object(a.jsx)("p", { children: "Show distribution for:" }),
                    Object(a.jsxs)(ze.a, {
                      value: t,
                      style: { width: "100%" },
                      disabled: !e.hammingMatrix,
                      onChange: function (t) {
                        e.dist_changeDataToDisplay(t);
                      },
                      children: [
                        Object(a.jsx)(Ct, { value: "all", children: "All" }),
                        Object(a.jsx)(Ct, {
                          value: "per-category",
                          children: "Per metadata column",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", {
                      children: "Available metadata column",
                    }),
                    Object(a.jsx)(ze.a, {
                      value: n,
                      style: { width: "100%" },
                      disabled: !e.hammingMatrix,
                      onChange: function (t) {
                        e.dist_changeDataColumn(t);
                      },
                    }),
                  ],
                }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("p", { children: "Chart(s) orientation" }),
                    Object(a.jsxs)(ze.a, {
                      value: r,
                      style: { width: "100%" },
                      disabled: !e.hammingMatrix,
                      onChange: function (t) {
                        e.dist_changeChartOrientation(t);
                      },
                      children: [
                        Object(a.jsx)(Ct, {
                          value: "horizontal",
                          children: "Horizontal",
                        }),
                        Object(a.jsx)(Ct, {
                          value: "vertical",
                          children: "Vertical",
                        }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsx)(g.a, {
                  span: 24,
                  children: Object(a.jsx)(ee.a, {
                    disabled: !e.hammingMatrix,
                    onClick: function (t) {
                      i || e.dist_changeIsUserDraw(!0);
                    },
                    children: "Draw chart",
                  }),
                }),
                Object(a.jsx)(He.a, { style: { margin: "10px 0px 0px 0px" } }),
                Object(a.jsxs)(g.a, {
                  span: 24,
                  children: [
                    Object(a.jsx)("h5", { children: "Export settings" }),
                    Object(a.jsx)("p", { children: "Export format " }),
                    Object(a.jsxs)(ze.a, {
                      value: c,
                      style: { width: "100%" },
                      children: [
                        Object(a.jsx)(Ct, { value: "svg", children: "SVG" }),
                        Object(a.jsx)(Ct, { value: "png", children: "PNG" }),
                      ],
                    }),
                  ],
                }),
                Object(a.jsx)(g.a, {
                  span: 24,
                  children: Object(a.jsx)(ee.a, {
                    onClick: function (t) {
                      o || e.dist_changeIsUserExport(!0);
                    },
                    children: "Export chart",
                  }),
                }),
              ],
            }),
          });
        }),
        Lt = n(971),
        Ut = n(94),
        It = function (e) {
          var t = Object(r.useState)(null),
            n = Object(ct.a)(t, 2),
            a = n[0],
            s = n[1];
          return (
            Object(r.useEffect)(
              function () {
                var t = e.current,
                  n = new Ut.a(function (e) {
                    e.forEach(function (e) {
                      s(e.contentRect);
                    });
                  });
                return (
                  n.observe(t),
                  function () {
                    n.unobserve(t);
                  }
                );
              },
              [e]
            ),
            a
          );
        },
        kt = n(134),
        Mt = n(265),
        Ft = n(434),
        At = n(969),
        Nt = n(970),
        qt = n(266);
      n(20);
      var Rt = Object(f.b)(
          function (e) {
            return {
              snpDistSettings: e.snpDistSettings,
              hammingMatrix: e.hammMatrix,
            };
          },
          function (e) {
            return Object(x.b)(
              { dist_changeIsUserDraw: wt, dist_changeIsUserExport: Dt },
              e
            );
          }
        )(function (e) {
          var t = Object(r.useRef)(),
            n = Object(r.useRef)(),
            s = It(t),
            c = s && s.width ? s.width : 300,
            i = Ee(100) - 300,
            o = 10,
            u = 20,
            l = 10,
            d = 20,
            p = c - d - u,
            j = i - o - l,
            b =
              (e.snpDistSettings.dataToDisplay,
              e.snpDistSettings.dataColumn,
              e.snpDistSettings.chartOrientation,
              e.snpDistSettings.snpDistExportFormat,
              e.snpDistSettings.isUserDrawChart);
          e.snpDistSettings.isUserExportSnpDist;
          return (
            Object(r.useEffect)(
              function () {
                b &&
                  setTimeout(function () {
                    !(function () {
                      var t = [],
                        a = [];
                      e.hammingMatrix.forEach(function (e, n) {
                        (t = t.concat(e)), a.push(n);
                      });
                      var r = new ut(a, t).getSymetricEdges().edges,
                        s = r.map(function (e) {
                          return e.value;
                        }),
                        c = {
                          min: Mt.a(s),
                          q1: Ft.a(s, 0.25),
                          median: At.a(s),
                          mean: Nt.a(s),
                          q3: Ft.a(s, 0.75),
                          max: qt.a(s),
                        },
                        i = kt.a().domain([c.min, c.max]).range([j, 0]),
                        h = Lt.a(n.current);
                      console.log(h),
                        Lt.a("#snpdist_svgGroup").remove(),
                        h.attr("width", p + d + u).attr("height", j + o + l);
                      var g = 300;
                      h.append("g")
                        .attr("id", "snpdist_svgGroup")
                        .attr(
                          "transform",
                          "translate(" + d + "," + o + ")scale(1)"
                        )
                        .selectAll(".snp-dist-points")
                        .data(r)
                        .enter()
                        .append("circle")
                        .attr("class", "snp-dist-points")
                        .attr("cy", function (e) {
                          return g / 2 + Math.random() * g;
                        })
                        .attr("cx", function (e) {
                          return i(e.value);
                        })
                        .attr("r", 4)
                        .style("fill", "white")
                        .attr("stroke", "black");
                    })(),
                      e.dist_changeIsUserDraw(!1);
                  }, 10);
              },
              [b]
            ),
            Object(a.jsx)(h.a, {
              children: Object(a.jsx)(g.a, {
                sm: 24,
                children: Object(a.jsx)("div", {
                  id: "snpdist-chart-container",
                  ref: t,
                  style: { height: "100%", width: "100%" },
                  children: Object(a.jsx)("svg", {
                    id: "snpdist-chart-svg",
                    ref: n,
                  }),
                }),
              }),
            })
          );
        }),
        Gt = Pe.a.Sider,
        Pt = Pe.a.Content;
      var zt = Object(f.b)(
          function (e) {
            return { hammingMatrix: e.hammMatrix };
          },
          function (e) {
            return Object(x.b)({}, e);
          }
        )(function (e) {
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsxs)(Pe.a, {
              children: [
                Object(a.jsx)(Gt, {
                  id: "snpdist-sider",
                  children: Object(a.jsx)(_t, {}),
                }),
                Object(a.jsx)(Pe.a, {
                  children: Object(a.jsx)(Pt, {
                    children: e.hammingMatrix && Object(a.jsx)(Rt, {}),
                  }),
                }),
              ],
            }),
          });
        }),
        Bt = n(136),
        Ht = n(981),
        Xt = n(989),
        Jt = n(59),
        Vt = Object(Jt.a)();
      var Yt = Object(f.b)(
          function (e, t) {
            return { navLocation: e.navSettings.navLocation };
          },
          function (e, t) {
            return Object(x.b)({ changeNavLocation: V }, e);
          }
        )(function (e) {
          var t = e.navLocation
            ? e.navLocation
            : (function (e) {
                if (!e) return "none";
                switch (e) {
                  case "/":
                    return "home";
                  case "/graphsnp":
                    return "graphsnp";
                  case "/documentation":
                    return "documentation";
                  case "/snpdistance":
                    return "matrix";
                  default:
                    return "none";
                }
              })(Vt.location.pathname);
          return Object(a.jsx)(s.a.Fragment, {
            children: Object(a.jsxs)(Ht.a, {
              id: "header-menu",
              mode: "horizontal",
              selectedKeys: [t],
              overflowedIndicator: Object(a.jsx)(Xt.a, {}),
              children: [
                Object(a.jsx)(
                  Ht.a.Item,
                  {
                    style: { padding: "0 20px", margin: "0px" },
                    onClick: function (t) {
                      e.changeNavLocation(t.key);
                    },
                    children: Object(a.jsx)(Bt.a, {
                      to: "/",
                      exact: !0,
                      children: "Home",
                    }),
                  },
                  "home"
                ),
                Object(a.jsx)(
                  Ht.a.Item,
                  {
                    style: { padding: "0 20px", margin: "0px" },
                    onClick: function (t) {
                      e.changeNavLocation(t.key);
                    },
                    children: Object(a.jsx)(Bt.a, {
                      to: "/snpdistance",
                      children: "SNP distance",
                    }),
                  },
                  "snpdistance"
                ),
                Object(a.jsx)(
                  Ht.a.Item,
                  {
                    style: { padding: "0 20px", margin: "0px" },
                    onClick: function (t) {
                      e.changeNavLocation(t.key);
                    },
                    children: Object(a.jsx)(Bt.a, {
                      to: "/graphsnp",
                      children: "GraphSNP",
                    }),
                  },
                  "graphsnp"
                ),
                Object(a.jsx)(
                  Ht.a.Item,
                  {
                    style: { padding: "0 20px", margin: "0px" },
                    onClick: function (t) {
                      e.changeNavLocation(t.key);
                    },
                    children: Object(a.jsx)(Bt.a, {
                      to: "/documentation",
                      children: "Documentation",
                    }),
                  },
                  "documentation"
                ),
              ],
            }),
          });
        }),
        Wt = n.p + "static/media/logo.1375c904.png",
        Qt =
          (n(951),
          function (e) {
            return Object(a.jsx)(s.a.Fragment, {
              children: Object(a.jsxs)(h.a, {
                id: "main-header",
                children: [
                  Object(a.jsx)(g.a, {
                    id: "header-navigation",
                    xs: 8,
                    sm: 18,
                    children: Object(a.jsx)(Yt, {}),
                  }),
                  Object(a.jsx)(g.a, {
                    id: "header-logo",
                    xs: 16,
                    sm: 6,
                    children: Object(a.jsx)("img", {
                      style: { float: "right" },
                      src: Wt,
                      alt: "GraphSNP",
                      height: "75px",
                    }),
                  }),
                ],
              }),
            });
          }),
        $t = (function (e) {
          Object(l.a)(n, e);
          var t = Object(d.a)(n);
          function n() {
            return Object(o.a)(this, n), t.apply(this, arguments);
          }
          return (
            Object(u.a)(n, [
              {
                key: "render",
                value: function () {
                  var e = Object(a.jsxs)(p.d, {
                    children: [
                      Object(a.jsx)(p.b, {
                        exact: !0,
                        path: "/",
                        component: Ge,
                      }),
                      Object(a.jsx)(p.b, { path: "/graphsnp", component: mt }),
                      Object(a.jsx)(p.b, {
                        path: "/documentation",
                        component: yt,
                      }),
                      Object(a.jsx)(p.b, {
                        path: "/snpdistance",
                        component: zt,
                      }),
                      Object(a.jsx)(p.a, { to: "/" }),
                    ],
                  });
                  return Object(a.jsxs)(p.c, {
                    history: Vt,
                    children: [
                      Object(a.jsx)(Qt, {}),
                      Object(a.jsx)("main", { children: e }),
                    ],
                  });
                },
              },
            ]),
            n
          );
        })(r.Component),
        Kt = function (e, t) {
          switch (t.type) {
            case T:
              return t.payload;
            default:
              return e || dn.sequence;
          }
        },
        Zt = function (e, t) {
          switch (t.type) {
            case S:
              var n = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.navLocation &&
                  (n.navLocation = t.payload),
                n
              );
            default:
              return e || dn.navSettings;
          }
        },
        en = function (e, t) {
          switch (t.type) {
            case _:
              var n = Object.assign({}, e);
              return (
                t.payload && t.payload !== e.method && (n.method = t.payload), n
              );
            case L:
              var a = Object.assign({}, e);
              return (
                t.payload && t.payload !== e.layout && (a.layout = t.payload), a
              );
            case U:
              var r = Object.assign({}, e);
              return (
                t.payload !== e.isUserReDraw && (r.isUserReDraw = t.payload), r
              );
            case I:
              var s = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.edgeFilterCutoff &&
                  (s.edgeFilterCutoff = t.payload),
                s
              );
            case k:
              var c = Object.assign({}, e);
              return (
                t.payload !== e.isUserFilterEdges &&
                  (c.isUserFilterEdges = t.payload),
                c
              );
            case M:
              var i = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.clusterMethod &&
                  (i.clusterMethod = t.payload),
                i
              );
            case F:
              var o = Object.assign({}, e);
              return (
                t.payload !== e.isUserClustering &&
                  (o.isUserClustering = t.payload),
                o
              );
            case A:
              var u = Object.assign({}, e);
              return (
                t.payload !== e.isEdgeScaled && (u.isEdgeScaled = t.payload), u
              );
            case N:
              var l = Object.assign({}, e);
              return (
                t.payload !== e.edgeScaleFactor &&
                  (l.edgeScaleFactor = t.payload),
                l
              );
            case q:
              var d = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.colorNodedBy &&
                  (d.colorNodedBy = t.payload),
                d
              );
            case R:
              var p = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.exportFormat &&
                  (p.exportFormat = t.payload),
                p
              );
            case G:
              var h = Object.assign({}, e);
              return (
                t.payload !== e.isUserDownloading &&
                  (h.isUserDownloading = t.payload),
                h
              );
            default:
              return e || dn.graphSettings;
          }
        },
        tn = function (e, t) {
          switch (t.type) {
            case E:
              return t.payload;
            default:
              return e || dn.metadata;
          }
        },
        nn = function (e, t) {
          switch (t.type) {
            case D:
              return t.payload;
            default:
              return e || dn.patientMovement;
          }
        },
        an = function (e, t) {
          switch (t.type) {
            case O:
              return t.payload;
            default:
              return e || dn.isInputLoading;
          }
        },
        rn = function (e, t) {
          switch (t.type) {
            case m:
              return t.payload;
            default:
              return e || dn.graphObject;
          }
        },
        sn = function (e, t) {
          switch (t.type) {
            case y:
              return t.payload;
            default:
              return e || dn.graphClusters;
          }
        },
        cn = function (e, t) {
          switch (t.type) {
            case v:
              return t.payload;
            default:
              return e || dn.hammMatrix;
          }
        },
        on = function (e, t) {
          switch (t.type) {
            case w:
              return t.payload;
            default:
              return e || dn.categoricalMap;
          }
        },
        un = function (e, t) {
          switch (t.type) {
            case C:
              return t.payload;
            default:
              return e || dn.colorLUT;
          }
        },
        ln = function (e, t) {
          switch (t.type) {
            case P:
              var n = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.dataToDisplay &&
                  (n.dataToDisplay = t.payload),
                n
              );
            case z:
              var a = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.dataColumn &&
                  (a.dataColumn = t.payload),
                a
              );
            case B:
              var r = Object.assign({}, e);
              return (
                t.payload !== e.chartOrientation &&
                  (r.chartOrientation = t.payload),
                r
              );
            case H:
              var s = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.snpDistExportFormat &&
                  (s.snpDistExportFormat = t.payload),
                s
              );
            case X:
              var c = Object.assign({}, e);
              return (
                t.payload !== e.isUserDrawChart &&
                  (c.isUserDrawChart = t.payload),
                c
              );
            case J:
              var i = Object.assign({}, e);
              return (
                t.payload &&
                  t.payload !== e.isUserExportSnpDist &&
                  (i.isUserExportSnpDist = t.payload),
                i
              );
            default:
              return e || dn.snpDistSettings;
          }
        },
        dn = {
          sequence: null,
          metadata: null,
          categoricalMap: null,
          patientMovement: null,
          isInputLoading: !1,
          hammMatrix: null,
          graphObject: null,
          graphClusters: null,
          graphSettings: {
            method: "mcg",
            layout: "cose",
            isUserReDraw: !1,
            isUserFilteringEdge: !1,
            edgeFilterCutoff: 25,
            clusterMethod: "Connected Components",
            isUserClustering: !1,
            isEdgeScaled: !0,
            edgeScaleFactor: 1,
            colorNodedBy: "na",
            exportFormat: "dot",
            isUserDownloading: !1,
          },
          snpDistSettings: {
            dataToDisplay: "all",
            dataColumn: null,
            chartOrientation: "horizontal",
            isUserDrawChart: !1,
            snpDistExportFormat: "svg",
            isUserExportSnpDist: !1,
          },
          navSettings: { navLocation: null },
          colorLUT: null,
        },
        pn = Object(x.c)(
          {
            sequence: Kt,
            metadata: tn,
            categoricalMap: on,
            patientMovement: nn,
            navSettings: Zt,
            graphSettings: en,
            hammMatrix: cn,
            graphObject: rn,
            graphClusters: sn,
            isInputLoading: an,
            colorLUT: un,
            snpDistSettings: ln,
          },
          dn
        ),
        hn = n(426),
        gn = n.n(hn),
        jn = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 990))
              .then(function (t) {
                var n = t.getCLS,
                  a = t.getFID,
                  r = t.getFCP,
                  s = t.getLCP,
                  c = t.getTTFB;
                n(e), a(e), r(e), s(e), c(e);
              });
        },
        bn = (function () {
          return Object(x.a)(gn.a)(x.d)(
            pn,
            dn,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__()
          );
        })();
      i.a.render(
        Object(a.jsx)(f.a, { store: bn, children: Object(a.jsx)($t, {}) }),
        document.getElementById("root")
      ),
        jn();
    },
  },
  [[954, 1, 2]],
]);
