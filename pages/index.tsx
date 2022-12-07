import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<{ college: string; branch: string }[]>([])
  const { register, handleSubmit } = useForm<any>({ defaultValues: { gender: 'm' } })

  const onSubmit = async (rawData: any) => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawData)
    })
    const data = await res.json()
    setData(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="card w-full max-w-xl space-y-8 px-16 pt-8 pb-14">
          <div>
            <h1 className="pt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              REAP College Predictor
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="rank" className="mb-1 block text-sm font-medium text-gray-700">
                Rank
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="rank"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="1000"
                  {...register('rank', { required: true, min: 1 })}
                />
              </div>
            </div>

            <fieldset className="flex">
              <legend className="mb-1 block text-sm font-medium text-gray-700">Gender</legend>
              <div className="mr-4 flex cursor-pointer items-center sm:text-sm">
                <input
                  type="radio"
                  id="male"
                  value="m"
                  {...register('gender', { required: true })}
                />
                <label htmlFor="male" className="px-2">
                  Male
                </label>
              </div>
              <div className="flex cursor-pointer items-center sm:text-sm">
                <input
                  type="radio"
                  id="female"
                  value="f"
                  {...register('gender', { required: true })}
                />
                <label htmlFor="female" className="px-2">
                  Female
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="relative rounded-md shadow-sm">
                <select
                  id="category"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register('category', { required: true })}
                >
                  <option value="gen">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </select>
              </div>
            </div>

            <fieldset className="flex flex-col">
              <legend className="mb-1 block text-sm font-medium text-gray-700">Preferences</legend>

              <div className="flex flex-col">
                <label htmlFor="fees" className="mb-0.5 sm:text-sm">
                  Is the fees comparatively less?
                </label>
                <input
                  type="range"
                  id="fees"
                  min="0"
                  max="5"
                  {...register('fees', { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="placement" className="mb-0.5 sm:text-sm">
                  How good are the placements?
                </label>
                <input
                  type="range"
                  id="placement"
                  min="0"
                  max="5"
                  {...register('placement', { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="year" className="mb-0.5 sm:text-sm">
                  How old is the college?
                </label>
                <input
                  type="range"
                  id="year"
                  min="0"
                  max="5"
                  {...register('year', { required: true })}
                />
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                className="group relative mt-12 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get top matches!
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full py-2 text-center font-medium text-indigo-900">
        Made by Mehul Saxena
      </footer>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <div className="flex flex-col">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="border-b bg-white">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                                  >
                                    College
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                                  >
                                    Branch
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({ college, branch }, i) => (
                                  <tr
                                    key={`result${i}`}
                                    className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                                  >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-800">
                                      {college}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-800">
                                      {branch}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Home
