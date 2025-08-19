import { addDaysToDate } from "@/lib/utils"

export default [
  {
    id: '668e70965676496c0c097b56',
    text: 'you can add',
    isCompleted: false,
    date: addDaysToDate(new Date(), 0),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b57',
    text: 'well done!',
    isCompleted: true,
    date: addDaysToDate(new Date(), 2),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b58',
    text: 'and delete',
    isCompleted: false,
    date: addDaysToDate(new Date(), 0),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b59',
    text: 'todos',
    isCompleted: false,
    date: addDaysToDate(new Date(), 0),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b55',
    text: 'and complete them',
    isCompleted: true,
    date: addDaysToDate(new Date(), 0),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b60',
    text: 'try dragging and ',
    isCompleted: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b61',
    text: 'dropping them',
    isCompleted: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b62',
    text: 'into the same day',
    isCompleted: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    id: '668e70965676496c0c097b63',
    text: 'or into a different day',
    isCompleted: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
]