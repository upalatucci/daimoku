'use client';

import { Dialog, Transition } from '@headlessui/react';
import { CalendarDaysIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useRef, useState } from 'react';

const AddDaimoku = () => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<Error>();

  const cancelButtonRef = useRef(null);

  const onAddDaimoku = () => {
    fetch('/api/daimoku', { method: 'POST', body: JSON.stringify({daimoku: 10}) })
      .then((response) => response.json())
      .then(() => {
        setDone(true);
      })
      .catch(setError);
  };

  useEffect(() => {
    if (open) {
        setDone(false)
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mr-3 from-[#ED1E79] to-[#ac2aed] bg-gradient-to-r border-none min-w-32 h-full min-h-12 text-lg py-2.5 px-6 rounded-xl border text-white"
      >
        Aggiungi il tuo Daimoku{' '}
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {done ? (
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className='mx-auto h-20 w-20 flex items-center justify-center bg-green-200 rounded-full bg-clip-border'>
                            <CheckIcon  className="h-10 w-10 text-green-500 "/>
                        </div>

                        
                            <Dialog.Title
                              as="h3"
                              className="text-base text-center px-8 mt-6 font-semibold leading-6 text-gray-900"
                            >
                              Grazie per il tuo contributo
                            </Dialog.Title>


                            <div className="px-4 py-3 mt-6 flex items-center justify-center w-full">
                        <button
                          type="button"
                          className="w-full justify-center rounded-md bg-magenta px-3 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-magenta sm:w-auto"
                          onClick={() => setOpen(false)}
                        >
                          Torna indietro
                        </button>
                    </div>

                    </div>
                  ) : (
                    <>
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <CalendarDaysIcon className="h-6 w-6 text-magenta" aria-hidden="true" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Quanto hai recitato?
                            </Dialog.Title>
                            <form className="flex flex-wrap w-full mt-2">
                              <div className="flex-1 min-w-[100px] m-4 md:m-4">
                                <label
                                  htmlFor="hour"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Ore
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="hour"
                                    name="country"
                                    autoComplete="country-name"
                                    className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </select>
                                </div>
                              </div>

                              <div className="flex-1 min-w-[100px] m-4 md:m-4">
                                <label
                                  htmlFor="hour"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Minuti
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="hour"
                                    name="country"
                                    autoComplete="country-name"
                                    className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  >
                                    {new Array(12)
                                      .fill(0)
                                      .map((_, i) => i * 5)
                                      .map((item) => (
                                        <option value={item} key={item}>
                                          {item}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {error && (<div>
                        <div>Errore</div>
                        {error?.message}
                      </div>)}
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-magenta px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-magenta sm:ml-3 sm:w-auto"
                          onClick={onAddDaimoku}
                        >
                          Aggiungi
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancella
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddDaimoku;
