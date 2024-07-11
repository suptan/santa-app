import classnames from "classnames";
import { LoaderProps } from "./Loader.types";

function Loader({
  active,
  overlay,
  thick = "medium",
  size = "medium",
}: LoaderProps) {
  // TODO: perfect center
  const classes = classnames(
    "animate-spin rounded-full border-4 border-solid border-gray-200 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
    overlay ? "fixed inset-1/2" : "inline-block",
    {
      [`h-8 w-8`]: size === "medium",
      [`h-4 w-4`]: size === "small",
    }
  );
  const wrapperClasses = classnames(
    "transition duration",
    overlay
      ? "fixed inset-0 bg-gray-900/50 dark:bg-neutral-900/80"
      : "inline-block"
  );

  if (!active) {
    return null;
  }
  return (
    <div className={wrapperClasses}>
      <div className={classes} role="status">
        <span className="!absolute !-m-px !h-px !w-px !overdlow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
      </div>
    </div>
  );
}

export { Loader };
