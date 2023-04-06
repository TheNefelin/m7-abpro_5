import { Sequelize, DataTypes, DATE, TIME, INTEGER } from 'sequelize';

const sequelize = new Sequelize(
    'postgres://postgres:123456@localhost:5432/consultorio',
    { define: { freezeTableName: true } }
);

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa');
    iniTablas();
} catch (err) {
    console.error('No se pudo conectar a la BD', err);
}

async function iniTablas() {
    const Especialidad = sequelize.define('especialidad', {
        codigo: { type: DataTypes.INTEGER, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: false },
    });

    const Medico = sequelize.define('medico', {
        rut: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false },
        idEspecialidad: { type: DataTypes.INTEGER, allowNull: false },
    });
    
    const Paciente = sequelize.define('paciente', {
        rut: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false }
    });

    const Licencia = sequelize.define('licencia', {
        codigo: { type: DataTypes.INTEGER, allowNull: false },
        diagnostico: { type: DataTypes.STRING, allowNull: false },
        fechaIni: { type:DATE, allowNull: false },
        fechaFin: { type:DATE, allowNull: false }
    });

    const Consulta = sequelize.define('consulta', {
        rutMedico: { type: DataTypes.STRING, allowNull: false },
        rutPaciente: { type: DataTypes.STRING, allowNull: false },
        fecha: { type:DATE, allowNull: false },
        hora: { type:TIME, allowNull: false },
        box: { type:INTEGER, allowNull: false },
        idLicencia: { type: DataTypes.INTEGER, allowNull: false },
    });

    // uno a uno
    Especialidad.belongsTo(Medico);
    Medico.hasOne(Especialidad);

    // relacion Consulta Medico Paciente
    Consulta.belongsTo(Medico);
    Medico.hasMany(Consulta);
    Consulta.belongsTo(Paciente);
    Paciente.hasMany(Consulta);

    await sequelize.sync();
};

