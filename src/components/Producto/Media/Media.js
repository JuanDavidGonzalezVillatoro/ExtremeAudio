import { Container } from "semantic-ui-react";
import { Video } from "./Video";
import { Gallery } from "./Gallery";
import { Separator } from "@/components/Shared";

export function Media(props) {
  const { screenshots, video } = props;

  return (
    <Container>
      <h2>Multimedia</h2>
      <Separator height={30} />
      <Gallery screenshots={screenshots} />
      <Separator height={30} />
      <Video video={video} />
    </Container>
  );
}