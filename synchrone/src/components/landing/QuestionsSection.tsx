import { Accordion, Typography } from '../common';

export const QuestionsSection = () => {
  return (
    <section className="w-full max-w-4xl flex flex-col gap-1">
      <Typography variant="h2" className="text-center mb-8">
        Часто задаваемые вопросы
      </Typography>
      <Accordion title="Что такое synchrone?">
        <p>
          Это редактор кода в браузере с открытым исходным кодом, который позволяет
          создавать проекты совместно с другими в реальном времени.
        </p>
      </Accordion>
      <Accordion title="Как мне использовать synchrone?">
        <p>
          Вы можете использовать <b>synchrone</b>, зарегистрировавшись на нашем сайте и
          создав новый проект. После этого вы сможете пригласить других пользователей в
          ваш проект и начать работу.
        </p>
      </Accordion>
      <Accordion title="Бесплатный ли synchrone?">
        <p>
          Да, <b>synchrone</b> полностью бесплатен. Вы можете использовать его без
          каких-либо ограничений. Так же вы можете создать свой собственный fork{' '}
          <b>synchrone</b>, дополнить его и разместить его на своем сервере.
        </p>
      </Accordion>
    </section>
  );
};
