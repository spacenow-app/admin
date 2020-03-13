import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core'
import { SpacenowScrollbars, SpacenowUtils } from '@spacenow'
import { withRouter } from 'react-router-dom'
import _ from '@lodash'
import InspectionsTableHead from './InspectionsTableHead'
import InspectionStatus from '../inspection/InspectionStatus'
import * as Actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

function InspectionsTable(props) {
  const dispatch = useDispatch()
  const inspections = useSelector(({ manageInspections }) => manageInspections.inspections.data)
  const searchValues = useSelector(({ manageInspections }) => manageInspections.inspections.searchValues)

  const [selected, setSelected] = useState([])
  const [data, setData] = useState(inspections)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  })

  useEffect(() => {
    dispatch(Actions.getInspections())
  }, [dispatch])

  useEffect(() => {
    setData(searchValues ? SpacenowUtils.filterObjectByProps(inspections, searchValues) : inspections)
  }, [inspections, searchValues])

  function handleRequestSort(event, property) {
    const id = property
    let direction = 'desc'

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc'
    }

    setOrder({
      direction,
      id
    })
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map(n => n.inspectionId))
      return
    }
    setSelected([])
  }

  // function handleClick(item) {
  //   props.history.push("/apps/managment/inspections/" + item.inspectionId);
  // }

  function handleChangePage(event, page) {
    setPage(page)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }
  return (
    <div className="w-full flex flex-col table-wrapper">
      <SpacenowScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <InspectionsTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                o => {
                  switch (order.id) {
                    case 'id': {
                      return o.id[0]
                    }
                    default: {
                      return o[order.id]
                    }
                  }
                }
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                const isSelected = selected.indexOf(n.inspectionId) !== -1
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={() => handleClick(n)}
                  >
                    <TableCell className="truncate" component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.listingId}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.guestId}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.message &&
                        n.message.messages &&
                        n.message.messages[0] &&
                        n.message.messages[n.message.messages.length - 1].content}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      <InspectionStatus name={n.status} />
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.date && moment(n.date).format('DD/MM/YYYY', moment.HTML5_FMT.DATE)}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.time}
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.createdAt}
                    </TableCell>
                    {/* <TableCell
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {n.emailConfirmed ? (
                        <Icon className="text-green text-20">
                          check_circle
                        </Icon>
                      ) : (
                        <Icon className="text-red text-20">
                          remove_circle
                        </Icon>
                      )}
                    </TableCell> */}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </SpacenowScrollbars>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default withRouter(InspectionsTable)
