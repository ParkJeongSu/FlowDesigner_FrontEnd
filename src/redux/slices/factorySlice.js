import { createSlice } from '@reduxjs/toolkit'

// 3. Create a Redux State Slice 리덕스 상태 슬라이스 생성
// 슬라이스를 만들려면 슬라이스를 식별하는 'name: 문자열 이름', 'initialState: 초기 상태값', '상태 업데이트 방법을 정의하는 하나 이상의 reducer 함수'가 필요 
// 슬라이스가 생성되면 생성된 redux 액션 생성자와, 전체 슬라이스에 대한 reducer 함수를 내보낼 수 있다.  
// Redux Toolkit createSlice과 createReducerAPI는 
// Immer를 내부에서 사용하여 변경 불가능한 올바른 업데이트가 되는 "불변" 업데이트 로직을 작성
export const factorySlice = createSlice({
  name: 'factory',
  initialState: {
    factoryName: '',
  },
  reducers: {
    changeFactoryName : (state, action) => {
      state.factoryName = action.payload
    },
  },
})

// 각 케이스 리듀서 함수에 대해 액션 생성자 생성
export const { changeFactoryName } = factorySlice.actions

// coutnerSlice의 reducer를 내보냄(default로 설정해서 다른 이름으로 받을수 o)
export default factorySlice