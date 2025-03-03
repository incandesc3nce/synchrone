import { Typography } from '../common';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    key: 'collaboration',
    title: 'Совместная разработка',
    description:
      'Работайте вместе с другими над одним и тем же файлом в реальном времени',
  },
  {
    key: 'languages',
    title: 'Несколько языков программирования',
    description:
      'Выберите язык программирования, который вам необходим и начните работу',
  },
  {
    key: 'workspaces',
    title: 'Рабочие пространства',
    description:
      'Создавайте рабочие пространства для совместной работы над отдельными проектами',
  },
  {
    key: 'open-source',
    title: 'Открытый исходный код',
    description:
      'Дополните функционал или создайте свою версию нашего продукта',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="flex flex-col gap-8 items-center">
      <Typography variant="h2" className="text-center">
        Возможности
      </Typography>
      <ul className="grid md:grid-cols-2 gap-10 mx-4 items-center max-w-1/2">
        {features.map((feature) => (
          <li key={feature.key} className='size-full'>
            <FeatureCard
              title={feature.title}
              description={feature.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
