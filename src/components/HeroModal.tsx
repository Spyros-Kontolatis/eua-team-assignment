import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { ModalClose } from "@mui/joy";
import { DataList } from "./core/DataList";

import type { Hero } from "../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 280, sm: 450, md: 600 },
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "black",
  outline: "none",
  borderRadius: "4px",
  textAlign: "center",
};

export const HeroModal = ({
  open,
  hero,
  handleClose,
}: {
  open: boolean;
  hero: Hero | null;
  handleClose: () => void;
}) => {
  if (hero)
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalClose
            onClick={handleClose}
            sx={{ "&:focus": { outline: "none" } }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {hero.name}
          </Typography>
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              maxHeight: { xs: 233, sm: "unset" },
              maxWidth: { xs: 350, sm: "50%" },
              objectFit: "fill",
            }}
            alt={hero.name}
            src={hero.imageUrl}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {!!hero.tvShows.length && (
              <DataList
                title="TV Shows"
                list={hero.tvShows}
                Icon={LiveTvIcon}
              />
            )}
            {!!hero.videoGames.length && (
              <DataList
                title="Video Games"
                list={hero.videoGames}
                Icon={SportsEsportsIcon}
              />
            )}
          </Box>
        </Box>
      </Modal>
    );
  return null;
};
