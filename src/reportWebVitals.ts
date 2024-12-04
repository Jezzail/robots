import { Metric, onCLS, onINP, onLCP } from "web-vitals";

const reportWebVitals = (onReport?: (metric: Metric) => void) => {
  if (onReport) {
    onCLS(onReport);
    onINP(onReport);
    onLCP(onReport);
  }
};

export default reportWebVitals;
