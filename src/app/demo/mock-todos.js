import { addDaysToDate } from "@/utils"

export default [
  {
    _id: '668e70965676496c0c097b56',
    text: 'you can add',
    done: false,
    date: new Date(),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b57',
    text: 'well done!',
    done: true,
    date: addDaysToDate(new Date(), 2),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b58',
    text: 'and delete',
    done: false,
    date: new Date(),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b59',
    text: 'todos',
    done: false,
    date: new Date(),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b55',
    text: 'and complete them',
    done: true,
    date: new Date(),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b60',
    text: 'try dragging and ',
    done: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b61',
    text: 'dropping them',
    done: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b62',
    text: 'into the same day',
    done: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
  {
    _id: '668e70965676496c0c097b63',
    text: 'or into a different day',
    done: false,
    date: addDaysToDate(new Date(), 1),
    isOverdue: false
  },
]