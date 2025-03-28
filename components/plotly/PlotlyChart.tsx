import { Config, Data, Layout, PlotMouseEvent } from 'plotly.js';
import Plot from 'react-plotly.js';

interface PlotComponentProps {
  data: Data[];
  layout: Partial<Layout>;
  config?: Partial<Config>;
  onClick?: (event: PlotMouseEvent) => void;
  onHover?: (event: PlotMouseEvent) => void;
  className?: string;
}

const PlotComponent: React.FC<PlotComponentProps> = ({
  data,
  layout,
  config,
  onClick,
  onHover,
  className,
}) => {
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      onClick={onClick}
      onHover={onHover}
      className={className}
    />
  );
};

export default PlotComponent;
