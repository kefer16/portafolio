"use client";

import { Component, ReactNode } from "react";

interface Props {
   children: ReactNode;
}

interface State {
   hasError: boolean;
}

class CanvasErrorBoundary extends Component<Props, State> {
   state: State = { hasError: false };

   static getDerivedStateFromError() {
      return { hasError: true };
   }

   render() {
      if (this.state.hasError) return null;
      return this.props.children;
   }
}

export default CanvasErrorBoundary;
