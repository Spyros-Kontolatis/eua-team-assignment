import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export const DataList = ({
  title,
  list,
  Icon,
}: {
  title: string;
  list: string[];
  Icon: SvgIconComponent;
}) => {
  return (
    <Box component="div">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {title}
      </Typography>
      <List dense>
        {list.map((element) => (
          <ListItem key={element}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={element} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
