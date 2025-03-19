import Icon from './icons/icon';

export default function Footer() {
  return (
    <footer className="mx-auto space-y-2 py-4">
      <div className="flex items-center justify-center space-x-4">
        <Icon kind="github" href="https://github.com/YUDONGHYUK" size={24} />
        <Icon
          kind="notion"
          href="https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1"
          size={24}
        />
      </div>
      <p>Copyright &copy; {new Date().getFullYear()} Doyu</p>
    </footer>
  );
}
