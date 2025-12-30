import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { sampleChannels, sampleCourses } from './UsersData';
import { DialogClose } from '@radix-ui/react-dialog';

export function ManageModeratorDialog({ className = '', cancel }: { className?: string; cancel?: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`px-4 py-2 border rounded-lg text-sm font-medium ${className}`}>
          Manage Moderation
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg  bg-white p-0 shadow-xl overflow-hidden [&>button]:hidden">
        <div className="flex justify-between items-center p-5 ">
          <DialogTitle className="text-xl font-bold">Manage Moderation</DialogTitle>
          <DialogClose onClick={cancel}>
            <i className="fa-solid fa-xmark text-gray-500 text-xl cursor-pointer"></i>
          </DialogClose>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="flex gap-6 px-6 border-none shadow-none bg-transparent">
            <TabsTrigger
              value="courses"
              className="
                pb-3 text-sm font-medium text-gray-600
                data-[state=active]:text-black
                data-[state=active]:border-b-2
                data-[state=active]:border-black
                rounded-none bg-transparent
              "
            >
              Moderated Courses
            </TabsTrigger>

            <TabsTrigger
              value="channels"
              className="
                pb-3 text-sm font-medium text-gray-600
                data-[state=active]:text-black
                data-[state=active]:border-b-2
                data-[state=active]:border-black
                rounded-none bg-transparent
              "
            >
              Moderated Channels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="max-h-80 overflow-y-auto p-2">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 pl-3"
              onClick={() => toast.error('This feature is comming.')}
            >
              <div className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg flex items-center justify-center ">
                +
              </div>
              <span className="text-sm font-medium">Add Courses</span>
            </button>

            {sampleCourses.map((course, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer
                  hover:bg-blue-50 transition 
                "
              >
                <div className="flex items-center gap-4">
                  <img src={course.image} className="w-12 h-12 rounded-lg" alt="" />
                  <span className="text-sm font-medium">{course.title}</span>
                </div>

                <button
                  className="text-red-500 p-2 hover:bg-red-100 rounded-md"
                  onClick={() => toast.success('Delete course  successfully.')}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="channels" className="max-h-80 overflow-y-auto p-2">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 pl-3"
              onClick={() => toast.error('This feature is comming.')}
            >
              <div className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg flex items-center justify-center">
                +
              </div>
              <span className="text-sm font-medium">Add Channels</span>
            </button>

            {sampleChannels.map((channel, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between p-3 rounded-lg 
                  hover:bg-blue-50 cursor-pointer transition
                pl-4"
              >
                <span className="text-sm font-medium">{channel}</span>

                <button
                  className="text-red-500 p-2 hover:bg-red-100 rounded-md"
                  onClick={() => {
                    toast.success('Delete channel  successfully.');
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
