import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

export default function DisplayAllPosts() {
  return (
    <div className="container">
      <div className="row p-4">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
              <CTableHeaderCell scope="col">Data</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow active>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilTrash}
                    height={24}
                    width={24}
                    />{" "}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilTrash}
                    height={24}
                    width={24}
                    />{" "}
              </CTableDataCell>
            </CTableRow>           
          </CTableBody>
        </CTable>
      </div>
    </div>   
  );
}
