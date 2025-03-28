import { useScrollIntoHook } from '@/hooks/logic/use-scroll-hook';
import { SectionScrollModel } from '@/types/general';
import { Container, Flex, Space } from '@mantine/core';
import { TabScrollIntoView } from './tab-scroll-intoview';

interface Props {
  sections: SectionScrollModel[];
  tabTitle?: string;
}
export const ScrollContainer: React.FC<Props> = ({ sections, tabTitle }) => {
  const { activeSection, handleTabClick, scrollContainerRef } =
    useScrollIntoHook({
      sections,
    });
  return (
    <div className="overflow-hidden">
      {/* Fixed header with tabs */}
      <TabScrollIntoView
        value={activeSection}
        tabTitle={tabTitle}
        scrollToSection={handleTabClick}
        sectionList={sections}
      />
      <div
        ref={scrollContainerRef}
        className="custom-scrollbar flex h-[calc(100vh_-_4rem)] flex-col gap-2 overflow-y-auto scroll-smooth"
      >
        <Container className="dashboard-container-wrapper dashboard-wrapper-two">
          <Flex className="flex-col gap-[24px]">
            {sections?.map((section) => (
              <section id={section?.id} key={section?.id}>
                {section.component}
              </section>
            ))}
            <Space className="h-2" />
          </Flex>
        </Container>
      </div>
    </div>
  );
};
