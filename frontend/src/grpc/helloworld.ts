/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.20.3
 * source: helloworld.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
import * as grpc_web_1 from "grpc-web";
export class HelloRequest extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        name?: string;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("name" in data && data.name != undefined) {
                this.name = data.name;
            }
        }
    }
    get name() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set name(value: string) {
        pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data: {
        name?: string;
    }): HelloRequest {
        const message = new HelloRequest({});
        if (data.name != null) {
            message.name = data.name;
        }
        return message;
    }
    toObject() {
        const data: {
            name?: string;
        } = {};
        if (this.name != null) {
            data.name = this.name;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.name.length)
            writer.writeString(1, this.name);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HelloRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HelloRequest();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.name = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): HelloRequest {
        return HelloRequest.deserialize(bytes);
    }
}
export class HelloReply extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        message?: string;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("message" in data && data.message != undefined) {
                this.message = data.message;
            }
        }
    }
    get message() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set message(value: string) {
        pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data: {
        message?: string;
    }): HelloReply {
        const message = new HelloReply({});
        if (data.message != null) {
            message.message = data.message;
        }
        return message;
    }
    toObject() {
        const data: {
            message?: string;
        } = {};
        if (this.message != null) {
            data.message = this.message;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.message.length)
            writer.writeString(1, this.message);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HelloReply {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HelloReply();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.message = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): HelloReply {
        return HelloReply.deserialize(bytes);
    }
}
export abstract class UnimplementedGreeterService {
    static definition = {
        SayHello: {
            path: "/helloworld.Greeter/SayHello",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: HelloRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => HelloRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: HelloReply) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => HelloReply.deserialize(new Uint8Array(bytes))
        }
    };
    [method: string]: grpc_1.UntypedHandleCall;
    abstract SayHello(call: grpc_1.ServerUnaryCall<HelloRequest, HelloReply>, callback: grpc_1.sendUnaryData<HelloReply>): void;
}
export class GreeterClient {
    private _address: string;
    private _client: grpc_web_1.GrpcWebClientBase;
    constructor(address: string, credentials?: Object, options?: grpc_web_1.GrpcWebClientBaseOptions) {
        if (!options)
            options = {};
        options.format = options.format || "text";
        this._address = address;
        this._client = new grpc_web_1.GrpcWebClientBase(options);
    }
    private static SayHello = new grpc_web_1.MethodDescriptor<HelloRequest, HelloReply>("/helloworld.Greeter/SayHello", grpc_web_1.MethodType.UNARY, HelloRequest, HelloReply, (message: HelloRequest) => message.serialize(), HelloReply.deserialize);
    SayHello(message: HelloRequest, metadata: grpc_web_1.Metadata | null) {
        return this._client.thenableCall<HelloRequest, HelloReply>(this._address + "/helloworld.Greeter/SayHello", message, metadata || {}, GreeterClient.SayHello);
    }
}
