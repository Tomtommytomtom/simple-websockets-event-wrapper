export class WebSocketWrapper{
    public ws: WebSocket
    callbacks: any
    constructor(ws: WebSocket){
        this.ws = ws;
        this.callbacks = {};
        ws.onmessage = (payload: any) => {
            console.log('raw json:',payload)
            const parsedPayload = JSON.parse(payload.data)
            console.log("succesfully parsed JSON, calling:",parsedPayload.eventName, "with parameter:",parsedPayload.data)
            if(this.callbacks[parsedPayload.eventName]){
                console.log("function with key:",parsedPayload.eventName,"actually exists. All callbacks:",this.callbacks)
                this.callbacks[parsedPayload.eventName](parsedPayload.data)
            }
        }
    }

    public on(eventName: string, callback: any){
        this.callbacks[eventName] = callback
    }

    public send(eventName: string, data: any){
        const payload = {
            eventName: eventName,
            data: data
        }
        this.ws.send(JSON.stringify(payload))
    }
}