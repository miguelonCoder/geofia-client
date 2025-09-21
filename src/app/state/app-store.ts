import { computed, inject } from "@angular/core";
import { MessageType } from "../features/chat/chat.component";
import { signalStore, withState, withProps, withHooks, patchState, withMethods, withComputed } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';
import { IaServerService } from "../services/ia-server.service";
import { v4 as uuidv4 } from 'uuid';

export enum StatusResponse {
  Loading,
  Loaded,
  Error,
  Idle
}

interface AppState {
  messages: MessageType[],
  queryStatus: StatusResponse,
  queryError: string | null,
  geometries: string[]
}

const initialState: AppState = {
  messages: [],
  queryStatus: StatusResponse.Idle,
  queryError: null,
  geometries: []
}

export const appStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(store => ({
    userMessages: computed(() => store.messages().filter(m => m.type === 'user')),
    SystemMessages: computed(() => store.messages().filter(m => m.type === 'system'))
  })),
  withProps(() => ({
    iaServer: inject(IaServerService)
  })),
  withMethods(store => ({
    addUserMessage: rxMethod<MessageType>(
      pipe(
        tap((message) => patchState(store, { queryStatus: StatusResponse.Loading, messages: [...store.messages(), message]})),
        switchMap( message => store.iaServer.runQuery(message.message)),
        tapResponse({
          next: (iaResponse) => {
            if(Array.isArray(iaResponse.data)){
              iaResponse.data.forEach(item => {
                if(item.geom){
                  patchState(store, { geometries: [...store.geometries(), item.geom]})
                }
              })
            }
            if (iaResponse.textIndication){
              const newIaMessage: MessageType = {
                id: uuidv4(),
                message: iaResponse.textIndication,
                type: 'system'
              }
              patchState(store, { messages: [ ...store.messages(), newIaMessage], queryStatus: StatusResponse.Loaded})
            }
          },
          error: (error) => {console.log(error)}
        })
      )
    )
  }))
)