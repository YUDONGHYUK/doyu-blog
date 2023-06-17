import { scrollToHeading } from '../../../lib/scrollToHeading';
import { generateSlug } from '../../../lib/generateSlug';
import styled from 'styled-components';

type TableOfContentsProps = {
  tocList: string[];
  activeHeading: string | null;
};

const TableOfContents = ({ tocList, activeHeading }: TableOfContentsProps) => {
  return (
    <Aside>
      <HeadingList>
        {tocList.map((toc) => (
          <li key={toc} className={toc === activeHeading ? 'active' : ''}>
            <a
              href={`#${generateSlug(toc)}`}
              onClick={(e) => {
                e.preventDefault();
                const slug = generateSlug(toc);
                scrollToHeading(slug);
              }}
            >
              {toc}
            </a>
          </li>
        ))}
      </HeadingList>
    </Aside>
  );
};

export default TableOfContents;

const Aside = styled.aside`
  position: fixed;
  top: 100px;
  right: calc(((100% - 51rem) * 0.15 / 2));
  width: calc(((100% - 51rem) / 2) * 0.7);
  max-width: 25rem;
  border-left: 1px solid ${({ theme }) => theme.border};

  @media screen and (max-width: 75rem) {
    display: none;
  }
`;

const HeadingList = styled.ul`
  li {
    margin: 1rem 0 1rem 1rem;
    padding: 0;
    font-size: ${({ theme }) => theme.font4};
    list-style: none;

    :hover {
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
    }
  }

  li.active {
    color: ${({ theme }) => theme.primary};
  }
`;
