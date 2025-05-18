import { model, Schema, Types } from "mongoose"
import { Assignments } from "./assignments.entity"

const assignmentsSchema = new Schema<Assignments>({
    title: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
    studentsCount: { type: Number, default: 0 },
    completedStudents: { type: [Types.ObjectId], ref: 'User' },
    classroomId: { type: String, ref: 'Classroom' }
});

assignmentsSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__id;
        delete ret.__v;
        delete ret.students;
        delete ret.completedStudents;
        delete ret.classroomId;
        return ret;
    }
});

assignmentsSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__id;
        delete ret.__v;
        delete ret.students;
        delete ret.completedStudents;
        delete ret.classroomId;
        return ret;
    }
});

assignmentsSchema.virtual('completedCount').get(function () {
    return this.completedStudents?.length;
});

export const AssignmentsModel = model<Assignments>('Assignment', assignmentsSchema);