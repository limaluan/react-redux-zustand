import Player from "react-player";

export function Video() {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        url="https://youtu.be/zStCyrh-CaE"
      />
    </div>
  );
}