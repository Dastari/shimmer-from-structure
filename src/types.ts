export interface ElementInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  tag: string;
}

export interface ShimmerProps {
  children: React.ReactNode;
  loading?: boolean;
  shimmerColor?: string;
  backgroundColor?: string;
  duration?: number;
  borderRadius?: number;
}
