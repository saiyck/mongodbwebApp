import React,{useState} from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Component's Base CSS
import "./index.css";
import { GetAllViewData, getCollections } from "../../common/Actions";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;


const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => {
    const [list,setList] = React.useState([]);
    const [schemaName,setSchemaName] = useState('Please select');
    const [data,setData] = useState([]);
    const [loading,setLoading] = React.useState(false);

    let students = [
        {
          id: 1,
          name: "Tran Manh Cuong",
          description: "Student from class SE1604",
          gender: 'M',
          address: 'duvvur',
        },
        {
          id: 2,
          name: "Tran Van Nhan",
          description: "Student from class SE1602",
          gender: 'M',
          address: 'duvvur',
        },
      ];
      
      let keys = Object.keys(students[0]);
      
      const SORTERS = {
        NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
        NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
        STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
        STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
      };
      
      const getSorter = data => {
        const mapper = x => x[data.field];
        let sorter = SORTERS.STRING_ASCENDING(mapper);
      
        if (data.field === "id") {
          sorter =
            data.direction === "ascending"
              ? SORTERS.NUMBER_ASCENDING(mapper)
              : SORTERS.NUMBER_DESCENDING(mapper);
        } else {
          sorter =
            data.direction === "ascending"
              ? SORTERS.STRING_ASCENDING(mapper)
              : SORTERS.STRING_DESCENDING(mapper);
        }
      
        return sorter;
      };
      
      let count = students.length;
      const service = {
        fetchItems: payload => {
          let result = Array.from(data);
          result = result.sort(getSorter(payload.sort));
           return Promise.resolve(result);
        },
        create: student => {
          count += 1;
          students.push({
            ...student,
            id: count
          });
          return Promise.resolve(student);
        },
        update: data => {
          const student = students.find(t => t.id === data.id);
          student.name = data.name;
          student.description = data.description;
          return Promise.resolve(student);
        },
        delete: data => {
          const student = students.find(t => t.id === data.id);
          students = students.filter(t => t.id !== student.id);
          return Promise.resolve(student);
        }
      };
      

    React.useEffect(()=> {
        handleCollections()
     },[])
     
     const handleCollections= async()=> {
      setLoading(true)
       let result = await getCollections();
       let lists = result.map((val) => val.name);
       setList(lists);
       setLoading(false)
     }

     const getCollectionFields = async(name) => {
        setLoading(true)
          setSchemaName(name);
        let result = await GetAllViewData(name);
        if(result){
          let dats = result.data;
          let firstObj = dats[0];
          delete firstObj['schema']
          delete firstObj['types']
          delete firstObj['__v']
          dats.shift();
          dats.unshift(firstObj);
          console.log(dats,'dtttdddd')  
          setData(dats);
        }else{
          setData([]);
          alert('no data found')
        }
        setLoading(false)
      }

    return (
  <div style={styles.container}>
     <div className='input99'>
          <h5>Select collection</h5>
            <DropdownButton onSelect={(key, obj) => getCollectionFields(key)} variant='dark' title={schemaName}>
              {
                list.map((val, ind) => {
                  return <Dropdown.Item key={ind} eventKey={val}>{val}</Dropdown.Item>
                })
              }
            </DropdownButton>
        </div>
    <CRUDTable
      caption={`${schemaName} List`}
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        {/* <Field name="id" label="Id" hideInCreateForm  hideInUpdateForm/> */}
        {console.log('keyysss',keys)}
        { keys.length > 0 &&
            keys.map((val)=> <Field name={val} label={val.toUpperCase()} placeholder={val} />)
        }
        {/* <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
        />
         <Field name="gender" label="Gender" placeholder="Gender" /> */}
      </Fields>
      <CreateForm
        name="Student Creation"
        message="Create a new student!"
        trigger="Create Student"
        onSubmit={student => service.create(student)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide student's name";
          }

          if (!values.description) {
            errors.description = "Please, provide student's description";
          }

          return errors;
        }}
      />

      <UpdateForm
        name="Student Update Process"
        message="Update student"
        trigger="Update"
        onSubmit={student => service.update(student)}
        submitText="Update"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide student's name";
          }

          if (!values.description) {
            errors.description = "Please, provide stundent's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        name="Student Delete Process"
        message="Are you sure you want to delete student?"
        trigger="Delete"
        onSubmit={student => service.delete(student)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
)};

Example.propTypes = {};

export default Example;

// ReactDOM.render(<Example />, document.getElementById("root"));
