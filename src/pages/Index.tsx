import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/14f0595a-0958-459c-8d44-548a5e00df61/files/c21759e8-a9ef-42e9-8848-17e64d7bcba9.jpg';
const PORTRAIT_IMG =
  'https://cdn.poehali.dev/projects/14f0595a-0958-459c-8d44-548a5e00df61/files/c676ff4c-c614-4fd4-af3a-fe610e2f1b69.jpg';
const COUPLE_IMG =
  'https://cdn.poehali.dev/projects/14f0595a-0958-459c-8d44-548a5e00df61/files/c923f453-43b7-4516-a4b3-3f5887483324.jpg';
const BLOG_IMG =
  'https://cdn.poehali.dev/projects/14f0595a-0958-459c-8d44-548a5e00df61/files/e0205650-3b7a-493c-a6b5-5147236e6504.jpg';

const NAV = [
  { id: 'about', label: 'Об авторе' },
  { id: 'services', label: 'Услуги' },
  { id: 'approaches', label: 'Подходы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'blog', label: 'Блог' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'booking', label: 'Контакты' },
];

const SERVICES = [
  {
    icon: 'HeartHandshake',
    title: 'Терапия пар',
    desc: 'Восстановление доверия, работа с конфликтами и охлаждением чувств.',
    price: '5 500 ₽ / 60 мин',
  },
  {
    icon: 'Users',
    title: 'Семейные сессии',
    desc: 'Диалог между поколениями, границы, роли и общие решения.',
    price: '6 000 ₽ / 75 мин',
  },
  {
    icon: 'MessageCircleHeart',
    title: 'Кризис отношений',
    desc: 'Поддержка на грани расставания, честный разговор о будущем.',
    price: '5 500 ₽ / 60 мин',
  },
  {
    icon: 'Sparkles',
    title: 'Добрачное консультирование',
    desc: 'Готовимся к совместной жизни осознанно и без иллюзий.',
    price: '5 000 ₽ / 60 мин',
  },
];

const APPROACHES = [
  {
    icon: 'Compass',
    title: 'Эмоционально-фокусированная терапия',
    desc: 'Работаем с эмоциями, которые стоят за ссорами, чтобы вернуть близость.',
  },
  {
    icon: 'Puzzle',
    title: 'Системный подход',
    desc: 'Смотрим на пару как на живую систему со своими правилами и циклами.',
  },
  {
    icon: 'Anchor',
    title: 'Теория привязанности',
    desc: 'Понимаем, как ранний опыт влияет на то, как вы любите сегодня.',
  },
];

const REVIEWS = [
  {
    name: 'Марина и Игорь',
    text: 'Мы пришли на грани развода. За несколько месяцев научились слышать друг друга. Это спасло семью.',
  },
  {
    name: 'Ольга и Дмитрий',
    text: 'Анна создаёт удивительно безопасное пространство. Впервые говорили о болезненном без крика.',
  },
  {
    name: 'Екатерина',
    text: 'Помогла понять себя ещё до отношений. Теперь я иначе выбираю партнёра и границы.',
  },
];

const BLOG = [
  { tag: 'Отношения', title: '5 фраз, которые разрушают близость', date: '28 июня 2026', img: BLOG_IMG },
  { tag: 'Конфликты', title: 'Как ссориться и становиться ближе', date: '14 июня 2026', img: COUPLE_IMG },
  { tag: 'Доверие', title: 'Что делать после измены: первые шаги', date: '2 июня 2026', img: HERO_IMG },
];

const FAQ = [
  {
    q: 'Нужно ли приходить вдвоём?',
    a: 'Идеально — да, но я работаю и индивидуально, если партнёр пока не готов. Изменения одного меняют всю систему.',
  },
  {
    q: 'Сколько нужно сессий?',
    a: 'В среднем от 8 до 15 встреч. На первой мы вместе определим ориентировочный план под вашу ситуацию.',
  },
  {
    q: 'Онлайн так же эффективно?',
    a: 'Да. Формат видеосессий по результатам не уступает очным встречам и экономит ваше время.',
  },
  {
    q: 'Гарантируется ли конфиденциальность?',
    a: 'Абсолютно. Всё, что происходит на сессии, остаётся между нами — это основа моей этики.',
  },
];

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const TIMES = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
const BUSY = new Set(['Пн-12:00', 'Вт-18:00', 'Ср-10:00', 'Пт-16:00', 'Сб-20:00', 'Чт-14:00']);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      toast({ title: 'Выберите время', description: 'Отметьте свободный слот в календаре.' });
      return;
    }
    toast({
      title: 'Заявка отправлена',
      description: `Вы записаны на ${slot.day}, ${slot.time}. Я свяжусь для подтверждения.`,
    });
    setSlot(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-5">
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-2xl font-semibold tracking-tight text-primary"
          >
            Анна Волкова
          </button>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="hover:text-primary transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('booking')} className="hidden md:inline-flex rounded-full">
            Записаться
          </Button>
          <button className="md:hidden text-primary" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 px-5 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  scrollTo(n.id);
                  setMenuOpen(false);
                }}
                className="text-left text-muted-foreground hover:text-primary"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-sm text-accent font-medium mb-6">
              <span className="h-px w-8 bg-accent" />
              Семейный психолог · терапия пар
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Вернуть <em className="text-primary not-italic">тепло</em> в отношения — возможно
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Помогаю парам услышать друг друга, пережить кризисы и заново
              почувствовать близость. Бережно, без осуждения, в вашем темпе.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full" onClick={() => scrollTo('booking')}>
                <Icon name="CalendarHeart" size={20} className="mr-2" />
                Записаться на приём
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => scrollTo('about')}
              >
                Об авторе
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm">
              <div>
                <div className="font-display text-3xl text-primary">12 лет</div>
                <div className="text-muted-foreground">в практике</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-3xl text-primary">600+</div>
                <div className="text-muted-foreground">пар и семей</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/10 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Терапия пар"
              className="relative rounded-[2.5rem] shadow-2xl w-full object-cover aspect-square animate-float"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-muted/50">
        <div className="container mx-auto px-5 grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/10 blur-2xl" />
              <img
                src={PORTRAIT_IMG}
                alt="Анна Волкова"
                className="relative rounded-[2rem] shadow-xl aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="text-accent font-medium mb-3">Об авторе</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6">Анна Волкова</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Клинический психолог, специалист по эмоционально-фокусированной
              терапии пар. Более 12 лет помогаю людям строить отношения, в
              которых хочется оставаться.
            </p>
            <p className="text-muted-foreground mb-8">
              Я верю, что за каждой ссорой прячется потребность быть услышанным.
              Моя задача — помочь вам увидеть эти потребности друг в друге.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                'МГУ, факультет психологии',
                'Сертификат EFT (ICEEFT)',
                'Член Ассоциации семейных психологов',
                'Регулярная супервизия',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-foreground">
                  <Icon name="BadgeCheck" size={20} className="text-accent shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mb-14">
            <p className="text-accent font-medium mb-3">Услуги</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Форматы работы под вашу ситуацию
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="hover-lift rounded-3xl border border-border bg-card p-7 flex flex-col"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{s.desc}</p>
                <p className="mt-5 font-medium text-primary">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACHES */}
      <section id="approaches" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mb-14">
            <p className="text-primary-foreground/70 font-medium mb-3">Подходы</p>
            <h2 className="font-display text-4xl sm:text-5xl">Научно обоснованные методы</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={COUPLE_IMG}
                alt="Пара на сессии"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="grid gap-8">
              {APPROACHES.map((a) => (
                <div key={a.title} className="border-t border-primary-foreground/20 pt-6">
                  <Icon name={a.icon} size={32} className="mb-4" />
                  <h3 className="font-display text-2xl mb-2">{a.title}</h3>
                  <p className="text-primary-foreground/70">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mb-14">
            <p className="text-accent font-medium mb-3">Отзывы</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Истории тех, кто вернул близость
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-3xl bg-muted/60 p-8 flex flex-col">
                <Icon name="Quote" size={30} className="text-accent mb-4" />
                <p className="text-foreground flex-1 leading-relaxed">{r.text}</p>
                <p className="mt-6 font-medium text-primary">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-muted/50">
        <div className="container mx-auto px-5">
          <div className="flex items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-3">Блог</p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground">
                Заметки о любви и отношениях
              </h2>
            </div>
            <Button variant="outline" className="rounded-full hidden sm:inline-flex">
              Все статьи
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG.map((b) => (
              <article
                key={b.title}
                className="hover-lift group rounded-3xl bg-card border border-border overflow-hidden cursor-pointer"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide">
                    {b.tag}
                  </span>
                  <h3 className="font-display text-2xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{b.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-accent font-medium mb-3">Частые вопросы</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Отвечаю на то, что волнует перед началом
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-xl text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 bg-muted/50">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-accent font-medium mb-3">Онлайн-запись</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6">
              Выберите удобное время
            </h2>
            <p className="text-muted-foreground mb-8">
              Отметьте свободный слот в календаре доступности на ближайшую неделю
              и оставьте контакты — я подтвержу запись лично.
            </p>

            <div className="rounded-3xl bg-card border border-border p-5">
              <div className="grid grid-cols-6 gap-2 mb-3 text-center text-sm font-medium text-muted-foreground">
                {DAYS.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="space-y-2">
                {TIMES.map((time) => (
                  <div key={time} className="grid grid-cols-6 gap-2">
                    {DAYS.map((day) => {
                      const busy = BUSY.has(`${day}-${time}`);
                      const active = slot?.day === day && slot?.time === time;
                      return (
                        <button
                          key={day + time}
                          disabled={busy}
                          onClick={() => setSlot({ day, time })}
                          className={[
                            'h-9 rounded-lg text-xs font-medium transition-all',
                            busy
                              ? 'bg-muted text-muted-foreground/40 cursor-not-allowed line-through'
                              : active
                              ? 'bg-primary text-primary-foreground shadow-md scale-105'
                              : 'bg-accent/10 text-primary hover:bg-accent/25',
                          ].join(' ')}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5 mt-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-accent/25" /> свободно
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-primary" /> выбрано
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-muted" /> занято
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl bg-card border border-border p-8 self-start">
            <h3 className="font-display text-2xl text-foreground mb-6">Ваши контакты</h3>
            {slot && (
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-accent/10 px-4 py-3 text-sm text-primary">
                <Icon name="CalendarCheck" size={18} />
                Выбрано: {slot.day}, {slot.time}
              </div>
            )}
            <div className="space-y-4">
              <Input placeholder="Ваше имя" required className="rounded-xl h-12" />
              <Input placeholder="Телефон или Telegram" required className="rounded-xl h-12" />
              <Textarea
                placeholder="Коротко опишите запрос (по желанию)"
                className="rounded-xl min-h-28"
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full mt-6">
              Отправить заявку
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 border-t border-border">
        <div className="container mx-auto px-5 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="font-display text-2xl text-primary mb-3">Анна Волкова</div>
            <p className="text-sm text-muted-foreground">
              Семейный психолог, терапия пар. Онлайн и Москва.
            </p>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center gap-2">
              <Icon name="Phone" size={16} /> +7 (999) 123-45-67
            </p>
            <p className="flex items-center gap-2">
              <Icon name="Mail" size={16} /> hello@anna-volkova.ru
            </p>
            <p className="flex items-center gap-2">
              <Icon name="MapPin" size={16} /> Москва, ул. Тверская
            </p>
          </div>
          <div className="flex sm:justify-end items-start gap-3">
            {['Send', 'Instagram', 'Youtube'].map((s) => (
              <a
                key={s}
                href="#"
                className="h-11 w-11 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon name={s} size={20} />
              </a>
            ))}
          </div>
        </div>
        <p className="container mx-auto px-5 mt-10 text-xs text-muted-foreground">
          © 2026 Анна Волкова. Все права защищены.
        </p>
      </footer>
    </div>
  );
}