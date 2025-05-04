import { Schema, model } from "mongoose";
import { Classroom } from "./classroom.entity";

const classroomSchema = new Schema<Classroom>({
    name: String,
    students: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

classroomSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.user;
        delete ret.students;
        return ret;
    }
});

classroomSchema.virtual('studentsCount').get(function() {
    return this.students.length;
});

export const ClassroomModel = model<Classroom>('Classroom', classroomSchema);