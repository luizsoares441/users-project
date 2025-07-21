import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { GetUsersAsync, AddUserAsync, UpdateUserAsync, DeleteUserAsync } from "../services/UserServices";

const Home = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User>>({});

    const getUsers = async () => {
        const usersData = await GetUsersAsync();
        if (usersData) {
            setUsers(usersData);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSaveUser = async () => {
        if (!currentUser.name || !currentUser.email) {
            alert("Nome e Email são obrigatórios.");
            return;
        }

        if (!currentUser.id) {
            await AddUserAsync({
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password,
            });
        } else {
            await UpdateUserAsync(currentUser.id, {
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password,
            });
        }

        setShowModal(false);
        getUsers();
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            await DeleteUserAsync(userId);
            getUsers();
        }
    };

    const openModalToAdd = () => {
        setCurrentUser({});
        setShowModal(true);
    };

    const openModalToEdit = (userToEdit: User) => {
        setCurrentUser(userToEdit);
        setShowModal(true);
    };

    return (
        <div className="bg-dark text-light min-vh-100 py-4">
            <div className="container">
                <h1 className="mb-4">Lista de Usuários</h1>
                <button onClick={openModalToAdd} className="btn btn-primary mb-3">
                    Cadastrar Novo Usuário
                </button>

                <table className="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => openModalToEdit(user)} className="btn btn-warning btn-sm me-2">Editar</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-light text-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title">{!currentUser.id ? 'Adicionar Usuário' : 'Editar Usuário'}</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nome:</label>
                                        <input type="text" id="name" className="form-control" value={currentUser.name || ''} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type="email" id="email" className="form-control" value={currentUser.email || ''} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Senha:</label>
                                        <input type="password" id="password" className="form-control" placeholder={currentUser.id ? "Deixe em branco para não alterar" : ""} value={currentUser.password || ''} onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                    <button type="button" className="btn btn-success" onClick={handleSaveUser}>Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;