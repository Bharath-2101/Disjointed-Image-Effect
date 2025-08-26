import React, { useRef, useMemo } from "react";
import styles from "./styles.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const MainConRef = useRef(null);

  useGSAP(() => {
    const main = MainConRef.current;
    if (!main) return;

    const sel = {
      first: `.${styles.VisualColFirst}`,
      second: `.Second.${styles.VisualColSecond}`,
      third: `.${styles.VisualColThird}`,
      col: `.${styles.VisualCol}`,
      corner: `.${styles.Corner}`,
    };

    gsap
      .timeline({
        scrollTrigger: {
          trigger: main,
          start: "top 10%",
          end: "20% 10%",
          scrub: true,
        },
      })
      .to(sel.second, { xPercent: -100, borderRadius: 0 }, 0)
      .to(sel.third, { xPercent: -200, borderRadius: 0 }, 0)
      .to(sel.first, { borderRadius: 0 }, 0);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: main,
          start: "10% 10%",
          end: "15% 10%",
          scrub: true,
        },
      })
      .to(sel.corner, { scale: 0, duration: 1, ease: "power1.out" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: main,
          start: "20% 10%",
          end: "40% 10%",
          scrub: true,
        },
      })
      .to(sel.col, { scaleX: 0 });
  }, []);

  const visualCols = useMemo(() => Array.from({ length: 10 }), []);

  return (
    <>
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
      >
        <span>Scroll Down</span>
      </div>
      <div ref={MainConRef} className={styles.MainContainer}>
        <img src="/image.jpg" alt="" className={styles.image} />
        <div className={styles.Bar}></div>

        <div className={styles.VisualCon}>
          {visualCols.map((_, index) => (
            <div key={index} className={styles.VisualCol}>
              <div className={styles.VisualColFirst}>
                {["top-left", "top-right", "bottom-right"].map((pos) => (
                  <div
                    key={pos}
                    className={`${styles.Corner} ${styles[pos]}`}
                  ></div>
                ))}
              </div>

              <div className={`${styles.VisualColSecond} Second`}>
                {["top-left", "bottom-right"].map((pos) => (
                  <div
                    key={pos}
                    className={`${styles.Corner} ${styles[pos]}`}
                  ></div>
                ))}
              </div>

              <div className={styles.VisualColThird}>
                {["top-left", "bottom-right", "bottom-left"].map((pos) => (
                  <div
                    key={pos}
                    className={`${styles.Corner} ${styles[pos]}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.Bar}></div>
      </div>
      <div style={{ height: "100vh" }}></div>
    </>
  );
};

export default App;
