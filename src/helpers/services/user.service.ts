import { api } from "../api/client";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getUser = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateRole = async (id: number, role: string) => {
  const res = await api.patch(`/users/${id}/role`, { role });
  return res.data;
};

export const updateStatus = async (id: number, status: string) => {
  const res = await api.patch(`/users/${id}/status`, { status });
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const getSuspendedUsers = async () => {
  const res = await api.get("/users/suspended/all");
  return res.data;
};

export const getBannedUsers = async () => {
  const res = await api.get("/users/banned/all");
  return res.data;
};


export const getAuditUsers = async () => {
  const res = await api.get("/users/auditUsers/all");
  return res.data;
};

export const liftSuspension = async (id: number) => {
  const res = await api.patch(`/users/${id}/lift`);
  return res.data;
};

export const reinstateUser = async (id: number) => {
  const res = await api.patch(`/users/${id}/reinstate`);
  return res.data;
};
