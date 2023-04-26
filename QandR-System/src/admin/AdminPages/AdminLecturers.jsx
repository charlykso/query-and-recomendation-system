import React, {useState, useRef} from 'react'
import Box from '@mui/material/Box'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import useFetch from '../../hooks/useFetch';
import { getLecturersURL } from '../../api';
import { FilterMatchMode } from 'primereact/api'
import Breadcrumb from '../adminSubPages/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link'
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { deleteLecturerURL } from '../../api';
import { useDelete } from '../../hooks/useDelete';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';


//modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #f00',
  boxShadow: 24,
  p: 4,
};

const AdminLecturers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const errRef = useRef()
  const [resError, setResError] = useState(null)
  const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const { data, isLoading, error} = useFetch(getLecturersURL)
  if (data) {
    // console.log(data);
  }
  const { deleteUser: deleteLecturer, isLoading: delIsLoading, delError, responseData } = useDelete()

  //modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [lect_Id, setLect_Id] = useState(null)

  // const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLect = async (e) => {
    const lecturerId = e.target.value;
    const url = deleteLecturerURL + lecturerId + "/delete";
    console.log(url);
  
    try {
      await deleteLecturer(url)
      if (delError) {
        setResError(delError)
      }else{
        navigate(- 1)
      }
      // console.log(delError);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const LecturerAction = (data) => {
    return <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => {setOpenDeleteModal(true);
              setLect_Id(data.Id);}} startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Link
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href={`lecturer/${data.Id}/update`}
                >
              <Button variant="contained" endIcon={<EditIcon />}>
                Edit
              </Button>
            </Link>
          </Stack>
  }
  return (
    <Box sx={{ p: 1}}>
      <Breadcrumb location={location.pathname} />
        
          <Box
            component="form"
            sx={{
              '& > :not(style)': {width: '100%', mt: 1, mb: 1 },
            }}
            noValidate
            autoComplete="off"
            onInput={(e) => 
              setFilters({
              global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
            })
          } 
          >
            <TextField id="outlined-basic" label="Search" variant="outlined" />
          </Box>
          {resError && <div className='text-red-500'>{resError}</div>}
          {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
          )}
          {data && 
          <DataTable value={data} filters={filters} paginator scrollable rows={5} rowsPerPageOptions={[5, 10, 15]} totalRecords={data.length}>
            <Column field='Title' header='Title' />
            <Column field='Firstname' header='FirstName' sortable/>
            <Column field='Lastname' header='LastName' sortable />
            <Column field='Email' header='Email' />
            <Column field='Gender' header='Gender' />
            <Column field='PhoneNumber' header='Phone Number' />
            <Column header='Action' body={LecturerAction} />
          </DataTable>}

        {/* //modal */}
        <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data={data}
      >
        <Box sx={style}>
          {delIsLoading && (<Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
          )}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Lecturer 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this lecturer? 
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" sx={{border: '1px solid red'}} onClick={deleteLect} value={lect_Id}>Delete</Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default AdminLecturers
