'use client';

import { Dialog, Transition } from '@headlessui/react';
import { CalendarDaysIcon, CheckIcon } from '@heroicons/react/24/outline';
import { FC, Fragment, useEffect, useRef, useState } from 'react';

type AddDaimokuProps = {
  setNewDaimoku: (newDaimoku: number) => void;
};

const AddDaimoku: FC<AddDaimokuProps> = ({ setNewDaimoku }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState(false);

  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const cancelButtonRef = useRef(null);

  const onAddDaimoku = () => {
    setLoading(true);
    fetch('/api/daimoku', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ hours, minutes }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setDone(true);
        const daimoku = (jsonResponse as { ok: string; daimoku: number })?.daimoku;
        if (daimoku) setNewDaimoku(daimoku);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (open) {
      setDone(false);
    }
  }, [open]);

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
                      <div className="mx-auto h-20 w-20 flex items-center justify-center bg-green-200 rounded-full bg-clip-border">
                        <CheckIcon className="h-10 w-10 text-green-500 " />
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
                                    name="hours"
                                    className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={hours}
                                    onChange={(e) => setHours(parseInt(e.currentTarget.value))}
                                  >
                                    <option>0</option>
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
                                    name="minutes"
                                    className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={minutes}
                                    onChange={(e) => setMinutes(parseInt(e.currentTarget.value))}
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
                      {error && (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8"
                          role="alert"
                        >
                          <h3 className="font-bold">Errore!</h3>
                          <span className="block sm:inline">{error?.message}</span>
                          <span
                            className="absolute inset-y-0 right-0 px-4 py-3"
                            onClick={() => setError(null)}
                          >
                            <svg
                              className="fill-current h-6 w-6 text-red-500"
                              role="button"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <title>Chiudi</title>
                              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                          </span>
                        </div>
                      )}
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-magenta px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-magenta sm:ml-3 sm:w-auto"
                          onClick={onAddDaimoku}
                          disabled={loading}
                        >
                          {loading && (
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
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
