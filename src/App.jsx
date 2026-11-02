import { Toaster } from "react-hot-toast";
import { LazyMotion, MotionConfig } from "framer-motion";
import SiteLayout from "./components/SiteLayout";

const loadMotionFeatures = () =>
  import("./motionFeatures").then((module) => module.default);

export default function App() {
  return (
    <>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SiteLayout />
        </MotionConfig>
      </LazyMotion>
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 10000 }}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#111820",
            color: "#f7f3e9",
            border: "1px solid rgba(217, 177, 82, 0.55)",
            borderRadius: "14px",
            padding: "14px 18px",
            fontFamily: "inherit",
          },
          success: {
            iconTheme: { primary: "#d9b152", secondary: "#111820" },
          },
          error: {
            iconTheme: { primary: "#ff756b", secondary: "#111820" },
          },
        }}
      />
    </>
  );
}
