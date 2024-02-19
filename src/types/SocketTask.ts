export interface SocketTask{
    onMessage(callback:Function):void,
    send(obj:Object):void,
    close(obj?:Object):void,
    onOpen(callback:Function):void,
    onClose(callback:Function):void,
    onError(callback:Function):void
}