import { useAppSelector } from "../store";

export function Header() {
  const {
    currentLesson: { title: lessonTitle },
    currentModule: { title: moduleTitle },
  } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    const currentModule = state.player.course.modules[currentModuleIndex];

    return { currentLesson, currentModule };
  });

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{lessonTitle}</h1>
      <span className="text-sm text-zinc-400">Módulo "{moduleTitle}"</span>
    </div>
  );
}
