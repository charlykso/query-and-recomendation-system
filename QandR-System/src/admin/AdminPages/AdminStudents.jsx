import React, {useState, useRef} from 'react'
import Box from '@mui/material/Box'
import useFetch from '../../hooks/useFetch'
import { getStudentsURL } from '../../api'
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
import { deleteStudentURL } from '../../api';
import { useDelete } from '../../hooks/useDelete';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';


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

const AdminStudents = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const errRef = useRef()
    const [resError, setResError] = useState(null)
    const [filters, setFilters] = useState({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS },
    })
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { deleteUser: deleteAStudent, isLoading: delIsLoading, delError, responseData } = useDelete()
    const { data, isLoading, error} = useFetch(getStudentsURL, token)
    if (data) {
      // console.log(data);
    }

    //modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [stu_Id, setStu_Id] = useState(null)

    // const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);


    const deleteStudent = async (e) => {
      const studentId = e.target.value;
      const url = deleteStudentURL + studentId + "/delete";
      // console.log(url);
    
      try {
        await deleteAStudent(url, token)
        if (delError) {
          setResError(delError)
        }else{
          navigate(- 1)
        }
        // console.log(delError);
      } catch (error) {
        setResError(error.message);
      }
    }
    // console.log(data);

    const studentAction = (data) => {
    return <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => {setOpenDeleteModal(true);
              setStu_Id(data.Id);}} startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Link
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href={`students/${data.Id}/update`}
                >
              <Button variant="contained"  endIcon={<EditIcon />}>
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
          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Students
          </Typography>
          {error && <div className='text-red-500'>{error}</div>}
          {resError && <div className='text-red-500'>{resError}</div>}
          {isLoading && (
                <div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
          )}
          {data && 
          <DataTable value={data} filters={filters} paginator scrollable rows={5} rowsPerPageOptions={[5, 10, 15]} totalRecords={data.length}>
            <Column field='RegNo' header='Reg Number' />
            <Column field='Firstname' header='FirstName' sortable/>
            <Column field='Lastname' header='LastName' sortable />
            <Column field='Email' header='Email' />
            <Column field='Gender' header='Gender' />
            <Column field='PhoneNumber' header='Phone Number' />
            <Column header='Action' body={studentAction} />
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
            Delete Student 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this student? 
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" sx={{border: '1px solid red'}} onClick={deleteStudent} value={stu_Id}>Delete</Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default AdminStudents
