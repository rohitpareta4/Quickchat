import { Drawer,Button, Box, Slide, Grow } from "@mui/material";
// import { useChatstore } from "@/app/store/useChatstore";
import CloseIcon from '@mui/icons-material/Close';
// import { getloggeduser } from "@/app/api/page";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { logoutuser } from "@/app/api/page";
// import { useMutation } from "@tanstack/react-query";
import ProfilePage from "@/app/auth/profilepage/page";
  
const Navmobileicon=({openhamIcon,setOpenhamIcon})=>{



    // const {data,isLoading}=useQuery({
    //     queryKey:['me'],
    //     queryFn:getloggeduser
    // })

//     const router=useRouter()


//      const mutation = useMutation({
//     mutationFn: logoutuser,
//     onSuccess: async() => {
//       disconnectSocket();
//      await queryClient.setQueryData(['me'],null)
//       queryClient.invalidateQueries({ queryKey: ['me'] });
//        toast.success('logout succesfully...')
//     },
//   });

//   const logoutusers = () => {
//     mutation.mutate({});
//   };
   
    
    return(
      <>
    
        <div>
                   <Drawer
  anchor="right"
  open={openhamIcon}
  onClose={() => setOpenhamIcon(false)}
  transitionDuration={400}
  PaperProps={{
    sx: {
      backgroundColor: '#0f172a', // Dark blue-gray
      color: '#e0f2fe',           // Light sky-blue text
      width: 360,
      borderLeft: '2px solid #38bdf8', // Sky border accent
      boxShadow: '0 0 30px rgba(0,0,0,0.7)',
      overflow: 'hidden',
    },
  }}
>
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
    
    {/* Close Button */}
    <div className="flex justify-end">
      <Button
        onClick={() => setOpenhamIcon(false)}
        sx={{
          minWidth: 0,
          color: '#38bdf8',
          '&:hover': { color: '#0ea5e9' },
        }}
      >
        <CloseIcon />
      </Button>
    </div>

    {/* Slide & Fade In */}
    <Slide direction="left" in={openhamIcon} timeout={500}>
      <Grow in={openhamIcon} timeout={800}>
     <div className="">
          <ProfilePage/>
     </div>
      </Grow>
    </Slide>
  </Box>
</Drawer>
        </div>

        </>
    )
}
export default Navmobileicon