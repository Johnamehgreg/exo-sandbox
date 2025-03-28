import Markdown from 'react-markdown';

interface Props {
  content: string;
}

const MarkdownWithLatex: React.FC<Props> = ({ content }) => {
  return <Markdown>{content}</Markdown>;
};

export default MarkdownWithLatex;
