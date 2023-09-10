import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { uidGen, shortDateFormat } from '../../utilities';

export interface ProjectType { // NOTE: shouldn't this come from the API?
  id: string;
  ref: string;
  name: string;
  description: string;
  colour: string;
  createdTimestamp: number;
}

export interface WorkUnitType { // NOTE: shouldn't these come from the API?
  id: string;
  workDayId: string;
  projectId: string;
  date: string;
  createdTimeStamp: number;
}

export interface WorkDayType {
  id: string;
  dayNotes?: string;
  date: string;
}

export interface UserDataStateType {
  requestInfo: any;
  projects: ProjectType[];
  workDays: WorkDayType[];
  workUnits: WorkUnitType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserDataStateType = {
  requestInfo: null,
  projects: [],
  workDays: [],
  workUnits: [],
  status: 'idle',
};

export const getUserData = createAsyncThunk(
  'userData/getUserData',
  async (userId: string) => {
    let theResponse = null;
    await fetch("/userData", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({id: userId})
    })
    .then((response) => response.json())
    .then((data) => theResponse = data)
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

interface CreateWorkUnitPropsType {
  theWorkDayId: string;
  theProjectId: string;
  optionalDate?: string;
}

export const createWorkUnit = createAsyncThunk(
  'userData/createWorkUnit',
  async (props: CreateWorkUnitPropsType) => {
    let theResponse = null;
    const newWorkUnit: WorkUnitType = {
      id: uidGen(),
      workDayId: props.theWorkDayId,
      projectId: props.theProjectId,
      date: props.optionalDate ? shortDateFormat(new Date(props.optionalDate)) : shortDateFormat(),
      createdTimeStamp: Date.now(),
    }
    await fetch("/userData/workUnit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(newWorkUnit)
    })
    .then((response) => {
      if(response.status === 201){
        theResponse = newWorkUnit;
      }
    })
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

export const deleteWorkUnit = createAsyncThunk(
  'userData/deleteWorkUnit',
  async (workUnitId: string) => {
    let theResponse = null;
    await fetch("/userData/workUnit", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({id: workUnitId})
    })
    .then((response) => {
      if(response.status === 200){
        theResponse = workUnitId; // this is used as the action payload so the workUnit can be deleted in the redux store too
      }
    })
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

export const createWorkDay = createAsyncThunk(
  'userData/createWorkDay',
  async () => {
    let theResponse = null;
    const newWorkDay: WorkDayType = {
      id: uidGen(),
      date: shortDateFormat()
    }
    await fetch("/userData/workDay", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(newWorkDay)
    })
    .then((response) => {
      if(response.status === 201){
        theResponse = newWorkDay;
      }
    })
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

export const deleteWorkDay = createAsyncThunk(// NOTE: when a work day is deleted it doesn't dissapear from the chart, I assume this is because there are work units still referencing it, or perhaps deleting it doesn't cause a re-render for some reason.
  'userData/deleteWorkDay',
  async (workDayId: string) => {
    let theResponse = null;
    await fetch("/userData/workDay", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({id: workDayId})
    })
    .then((response) => {
      if(response.status === 200){
        theResponse = workDayId; // this is used as the action payload so the workUnit can be deleted in the redux store too
      }
    })
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          state.projects = action.payload["projects"] || null;
          state.workDays = action.payload["workDays"] || null;
          state.workUnits = action.payload["workUnits"] || null;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      })

      // deleteWorkUnit
      .addCase(deleteWorkUnit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWorkUnit.fulfilled, (state: UserDataStateType, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          const index = state.workUnits.findIndex((item: WorkUnitType) => item.id === action.payload);
          if (index !== -1) {
            state.workUnits.splice(index, 1);
          }
        }
      })
      .addCase(deleteWorkUnit.rejected, (state) => {
        state.status = 'failed';
      })
      
      // createWorkUnit
      .addCase(createWorkUnit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWorkUnit.fulfilled, (state: UserDataStateType, action) => {
        state.status = 'idle';
        if(!!action.payload) {
            state.workUnits.push(action.payload);
        }
      })
      .addCase(createWorkUnit.rejected, (state) => {
        state.status = 'failed';
      })

      // deleteWorkDay
      .addCase(deleteWorkDay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWorkDay.fulfilled, (state: UserDataStateType, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          const index = state.workDays.findIndex((item: WorkDayType) => item.id === action.payload);
          if (index !== -1) {
            state.workDays.splice(index, 1);
          }
        }
      })
      .addCase(deleteWorkDay.rejected, (state) => {
        state.status = 'failed';
      })
      
      // createWorkDay
      .addCase(createWorkDay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWorkDay.fulfilled, (state: UserDataStateType, action) => {
        state.status = 'idle';
        if(!!action.payload) {
            state.workDays.push(action.payload);
        }
      })
      .addCase(createWorkDay.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUserData = (state: RootState) => state.userData;


export default userDataSlice.reducer;
