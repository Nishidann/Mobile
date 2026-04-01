import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class TelaListagem extends StatefulWidget {
  const TelaListagem({super.key});

  @override
  State<TelaListagem> createState() => _TelaListagemState();
}

class _TelaListagemState extends State<TelaListagem> {
  late Future<List<dynamic>> _futureUsuarios;

  @override
  void initState() {
    super.initState();
    _futureUsuarios = _buscarUsuarios();
  }

  Future<List<dynamic>> _buscarUsuarios() async {
    try {
      final response = await http.get(
        Uri.parse('http://localhost:3000/usuarios'),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['usuarios'] ?? [];
      } else {
        throw Exception('Erro ao carregar usuários');
      }
    } catch (e) {
      throw Exception('Falha na conexão com o servidor. Verifique se o backend está rodando.');
    }
  }

  void _recarregar() {
    setState(() {
      _futureUsuarios = _buscarUsuarios();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Lista de Usuários'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _recarregar,
            tooltip: 'Recarregar',
          ),
        ],
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _futureUsuarios,
        builder: (context, snapshot) {
          // Estado de carregamento
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Carregando usuários...'),
                ],
              ),
            );
          }

          // Estado de erro
          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      size: 80,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      snapshot.error.toString().replaceAll('Exception: ', ''),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.red,
                      ),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton.icon(
                      onPressed: _recarregar,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Tentar novamente'),
                    ),
                  ],
                ),
              ),
            );
          }

          // Lista vazia
          final usuarios = snapshot.data ?? [];
          if (usuarios.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.people_outline,
                    size: 80,
                    color: Colors.grey,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Nenhum usuário cadastrado',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: _recarregar,
                    icon: const Icon(Icons.refresh),
                    label: const Text('Recarregar'),
                  ),
                ],
              ),
            );
          }

          // Lista de usuários
          return ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: usuarios.length,
            itemBuilder: (context, index) {
              final usuario = usuarios[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.blue,
                    child: Text(
                      usuario['nome']?.substring(0, 1).toUpperCase() ?? '?',
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                  title: Text(
                    usuario['nome'] ?? 'Sem nome',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    usuario['email'] ?? 'Sem e-mail',
                    style: const TextStyle(color: Colors.grey),
                  ),
                  trailing: Text(
                    '#${usuario['id']}',
                    style: const TextStyle(color: Colors.grey),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
