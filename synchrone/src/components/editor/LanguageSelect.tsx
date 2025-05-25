import { useSocket } from '@/hooks/common/useSocket';
import { ProgrammingLanguage } from '@/types/core/workspace/ProgrammingLanguage';

export const LanguageSelect = () => {
  const {
    io: { language, handleChangeLanguage },
  } = useSocket();

  return (
    <select
      className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 mb-4"
      value={language}
      onChange={(e) => handleChangeLanguage(e.target.value as ProgrammingLanguage)}>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="csharp">C#</option>
      <option value="go">Go</option>
      <option value="rust">Rust</option>
    </select>
  );
};
