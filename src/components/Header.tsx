import { useCurrentLesson } from "../store/slices/player";

export function Header() {
  const {
    currentLesson: { title: lessonTitle },
    currentModule: { title: moduleTitle },
  } = useCurrentLesson();

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{lessonTitle}</h1>
      <span className="text-sm text-zinc-400">Módulo "{moduleTitle}"</span>
    </div>
  );
}
