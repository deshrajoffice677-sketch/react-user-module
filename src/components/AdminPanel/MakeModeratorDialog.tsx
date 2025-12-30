import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { sampleChannels, sampleCourses } from './UsersData';
import { DialogClose } from '@radix-ui/react-dialog';

export function MakeModeratorDialog({ className = '', cancel }: { className?: string; cancel?: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`px-4 py-2 border rounded-lg text-sm font-medium ${className}`}>
          Make Moderator
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg  bg-white p-0 shadow-xl overflow-hidden [&>button]:hidden">
        <div className="flex justify-between items-center p-5 ">
          <DialogTitle className="text-xl font-bold">Make Moderator</DialogTitle>
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
              Courses
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
              Channels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="max-h-80 overflow-y-auto p-2 ">
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
                  className="text-black-500 p-2 hover:bg-gray-400 rounded-md"
                  onClick={() => toast.success('Added course  successfully.')}
                >
                  <PlusIcon size={18} />
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="channels" className="max-h-80 overflow-y-auto p-2">
            {sampleChannels.map((channel, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between p-3 rounded-lg 
                  hover:bg-blue-50 cursor-pointer transition
                "
              >
                <span className="text-sm font-medium">{channel}</span>

                <button
                  className="text-black-500 p-2 hover:bg-gray-400 rounded-md"
                  onClick={() => toast.success('Added channel  successfully.')}
                >
                  <PlusIcon size={18} />
                </button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
