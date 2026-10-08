import { LazyMotion, MotionConfig } from "framer-motion";
import SiteLayout from "./components/SiteLayout";

const loadMotionFeatures = () =>
  import("./motionFeatures").then((module) => module.default);

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SiteLayout />
      </MotionConfig>
    </LazyMotion>
  );
}
