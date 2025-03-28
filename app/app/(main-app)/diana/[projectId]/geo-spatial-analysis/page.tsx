import { Metadata } from 'next';
import GeoSpatialAnalysisClient from './components/geo-spatial-analysis-client';

export const metadata: Metadata = {
  title: 'GeoSpatial Analysis',
};

const GeoSpatialAnalysisPage = () => {
  return <GeoSpatialAnalysisClient />;
};

export default GeoSpatialAnalysisPage;
