import { Component, ReactNode } from "react";
import { ErrorPageLayout } from "./error-page-layout";
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPageLayout
          message="It looks like something broke on our end. We're already on it, but if this keeps happening, feel free to reach out to our support team—they’re here to help!"
          title="Well! This is embarrassing"
          resetError={() => {}}
          error={null}
        ></ErrorPageLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
