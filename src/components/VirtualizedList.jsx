import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

const Row = props => {
  const { data, index } = props;
  return (
      <ListItem key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={data[index].name} />
      </ListItemButton>
    </ListItem>
  );
};


export default function VirtualizedList(props) {
  const { dataList } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height:  dataList==null ? 400 : dataList.length*50,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={  dataList==null ? 400 : dataList.length*46}
        width={360}
        itemSize={46}
        itemCount={dataList==null ? 0 : dataList.length}
        overscanCount={5}
        itemData={dataList}
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
}



// function renderRow(props) {
//   const { index, style } = props;

//   return (
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// }

// export default function VirtualizedList() {
//   return (
//     <Box
//       sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
//     >
//       <FixedSizeList
//         height={400}
//         width={360}
//         itemSize={46}
//         itemCount={10}
//         overscanCount={5}
//       >
//         {renderRow}
//       </FixedSizeList>
//     </Box>
//   );
// }
