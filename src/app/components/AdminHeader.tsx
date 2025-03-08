import { CCol, CContainer, CHeader } from "@coreui/react"

export default function AdminHeader({ type }: {type: string}) {
    return (
        <CHeader>
            <CContainer>
                <CCol className="col-12 pt-5 m-0 text-center">
                    <h1>{type.toUpperCase()}</h1>
                </CCol>
            </CContainer>
        </CHeader>    
    )
}