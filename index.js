import { Sequelize, DataTypes, DATE, TIME, INTEGER } from 'sequelize';

const sequelize = new Sequelize(
    'postgres://postgres:123456@localhost:5432/consultorio',
    { define: { freezeTableName: true } }
);

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa');
    tablaEspecialidad();
    tablaMedico();
    tablaPaciente();
    tablaLicencia();
    tablaConsulta();
} catch (err) {
    console.error('No se pudo conectar a la BD', err);
}

async function tablaEspecialidad() {
    const Especialidad = sequelize.define('especialidad', {
        codigo: { type: DataTypes.INTEGER, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: false },
    });

    await Especialidad.sync();
};

async function tablaMedico() {
    const Medico = sequelize.define('medico', {
        rut: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false },
        idEspecialidad: { type: DataTypes.INTEGER, allowNull: false },
    });
    
    await Medico.sync();
};

async function tablaPaciente() {
    const Paciente = sequelize.define('paciente', {
        rut: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false }
    });

    await Paciente.sync();
};

async function tablaLicencia() {
    const Licencia = sequelize.define('licencia', {
        codigo: { type: DataTypes.INTEGER, allowNull: false },
        diagnostico: { type: DataTypes.STRING, allowNull: false },
        fechaIni: { type:DATE, allowNull: false },
        fechaFin: { type:DATE, allowNull: false }
    });

    await Licencia.sync();
};

async function tablaConsulta() {
    const Consulta = sequelize.define('consulta', {
        rutMedico: { type: DataTypes.STRING, allowNull: false },
        rutPaciente: { type: DataTypes.STRING, allowNull: false },
        fecha: { type:DATE, allowNull: false },
        hora: { type:TIME, allowNull: false },
        box: { type:INTEGER, allowNull: false },
        idLicencia: { type: DataTypes.INTEGER, allowNull: false },
    });

    await Consulta.sync();
};
